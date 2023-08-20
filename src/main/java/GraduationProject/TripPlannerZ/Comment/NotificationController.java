package GraduationProject.TripPlannerZ.Comment;


import GraduationProject.TripPlannerZ.domain.Member;
import GraduationProject.TripPlannerZ.domain.MemberParty;
import GraduationProject.TripPlannerZ.domain.Trip;
import GraduationProject.TripPlannerZ.repository.MemberPartyRepository;
import GraduationProject.TripPlannerZ.service.MemberService;
import GraduationProject.TripPlannerZ.service.PartyService;
import GraduationProject.TripPlannerZ.service.TripService;
import GraduationProject.TripPlannerZ.sseEmitter.SseEmitterService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"}, allowCredentials = "true")
public class NotificationController {

    private final SseEmitterService sseEmitterService;
    private final MemberService memberService;
    private final CommentService commentService;
    private final TripService tripService;
    private final PartyService partyService;
    private final MemberPartyRepository memberPartyRepository;


    @RequestMapping(value = "/sub", consumes = MediaType.ALL_VALUE)
    public SseEmitter subscribe(HttpServletRequest request) {
        // 세션문제 해결하면 주석 제거
//        String memberEmail = (String) request.getSession().getAttribute("loginMember");
//        Long memberId = memberService.findByEmail(memberEmail).get().getId();

        return sseEmitterService.subscribe(1L);

    }

    @PostMapping("/sendComment")
    public void commentAndNotify(HttpServletRequest request, @RequestBody CommentDTO commentDTO) {

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


        List<MemberParty> receivers = memberPartyRepository.findAllByPartyId(partyId);
        sseEmitterService.sendNotificationToMembersInParty(receivers, comment);

    }

}
