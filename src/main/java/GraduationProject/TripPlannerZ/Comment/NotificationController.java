package GraduationProject.TripPlannerZ.Comment;


import GraduationProject.TripPlannerZ.domain.Member;
import GraduationProject.TripPlannerZ.domain.MemberParty;
import GraduationProject.TripPlannerZ.domain.Trip;
import GraduationProject.TripPlannerZ.repository.MemberPartyRepository;
import GraduationProject.TripPlannerZ.service.MemberService;
import GraduationProject.TripPlannerZ.service.PartyService;
import GraduationProject.TripPlannerZ.service.TripService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class NotificationController {
    // 사용자 구독정보를 저장하는 Map
    public static Map<Long, SseEmitter> emitters = new ConcurrentHashMap<>();
    private final MemberService memberService;
    private final CommentService commentService;
    private final TripService tripService;
    private final PartyService partyService;
    private final MemberPartyRepository memberPartyRepository;
    private final NotificationService notificationService;

    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"}, allowCredentials = "true")
    @RequestMapping(value = "/sub", consumes = MediaType.ALL_VALUE)
    public SseEmitter subscribe(HttpServletRequest request) {

        SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);
        try {
            sseEmitter.send(SseEmitter.event().name("connected"));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
//        String memberEmail = (String) request.getSession().getAttribute("loginMember");
//        Long memberId = memberService.findByEmail(memberEmail).get().getId();
//        System.out.println("memberId = " + memberId);
        emitters.put(1L, sseEmitter);



        sseEmitter.onCompletion(() -> emitters.remove(1L));
        sseEmitter.onTimeout(() -> emitters.remove(1L));
        sseEmitter.onError((e) -> emitters.remove(1L));

        return sseEmitter;
    }

    @PostMapping("/sendComment")
    public void commentAndNotify(HttpServletRequest request, @RequestBody CommentDTO commentDTO) {

        ObjectMapper objectMapper = new ObjectMapper();

        String loginMemberEmail = (String) request.getSession().getAttribute("loginMember");
        Member sender = memberService.findByEmail(loginMemberEmail).get();

        Trip trip = tripService.findByUUID(commentDTO.getTripUUID()).get();
        Long partyId = partyService.findByTripId(trip.getId());

        // 댓글 디비 저장
        Comment comment = Comment.builder()
                .content(commentDTO.getComment())
                .sender(sender)
                .trip(trip)
                .build();
        commentService.saveComment(comment);

        List<MemberParty> receiver = memberPartyRepository.findAllByPartyId(partyId);

        for (MemberParty receivedMember : receiver) {
            Member m = receivedMember.getMember();

            // 알림 저장 및 알림 전송
            Notification notification = Notification.builder()
                    .comment(comment)
                    .member(m)
                    .build();

            notificationService.saveNotification(notification);
            Long id = m.getId();

            if (emitters.containsKey(id)) {
                try {
                    String nJson = objectMapper.writeValueAsString(notification);
                    emitters.get(id).send(SseEmitter.event().id(notification.getId().toString()).name("comment").data(nJson));
                } catch (IOException e) {
                    emitters.remove(id);
                    throw new RuntimeException(e);
                }
            }
        }

    }

}
