package GraduationProject.TripPlannerZ.Comment;


import GraduationProject.TripPlannerZ.domain.Member;
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
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"}, allowCredentials = "true")
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


    @RequestMapping(value = "/sub", consumes = MediaType.ALL_VALUE)
    public SseEmitter subscribe(HttpServletRequest request) {

        SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);
        try {
            sseEmitter.send(SseEmitter.event().name("connected"));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        String memberEmail = (String) request.getSession().getAttribute("loginMember");
        Long memberId = memberService.findByEmail(memberEmail).get().getId();
        emitters.put(memberId, sseEmitter);

        sseEmitter.onCompletion(() -> emitters.remove(memberId));
        sseEmitter.onTimeout(() -> emitters.remove(memberId));
        sseEmitter.onError((e) -> emitters.remove(memberId));

        return sseEmitter;
    }

    @PostMapping("/sendComment")
    public void commentAndNotify(HttpServletRequest request, @RequestParam("content") String content, @RequestParam("tripUUID") String tripUUID) {

        // 댓글 디비 저장
        Comment comment = Comment.builder()
                .content(content)
                .build();

        String loginMemberEmail = (String) request.getSession().getAttribute("loginMember");
        Member sender = memberService.findByEmail(loginMemberEmail).get();

        comment.setSender(sender);

        Trip trip = tripService.findByUUID(tripUUID).get();

        comment.setTrip(trip);

        commentService.saveComment(comment);

        // 알림 저장 및 알림 전송
        Notification notification = new Notification(sender.getName(), trip.getTitle(), "comment", tripUUID);

        Long partyId = partyService.findByTripId(trip.getId());
        List<Member> subscribedMembers = memberPartyRepository.findByPartyId(partyId);
        ObjectMapper objectMapper = new ObjectMapper();

        for (Member subscribedMember : subscribedMembers) {
            Long id = subscribedMember.getId();
            if (emitters.containsKey(id)) {
                try {
                    String nJson = objectMapper.writeValueAsString(notification);
                    emitters.get(id).send(SseEmitter.event().name(notification.getType()).data(notification));
                } catch (IOException e) {
                    emitters.remove(id);
                    throw new RuntimeException(e);
                }
            }
        }

        notificationService.saveNotification(notification);


    }


}
