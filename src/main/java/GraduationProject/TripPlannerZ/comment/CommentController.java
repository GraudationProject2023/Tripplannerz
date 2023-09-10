package GraduationProject.TripPlannerZ.comment;

import GraduationProject.TripPlannerZ.domain.Member;
import GraduationProject.TripPlannerZ.domain.Trip;
import GraduationProject.TripPlannerZ.dto.CommentPost;
import GraduationProject.TripPlannerZ.service.MemberService;
import GraduationProject.TripPlannerZ.service.TripService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class CommentController {

    private final CommentService commentService;
    private final MemberService memberService;
    private final TripService tripService;

    @PostMapping("/trip/postComment")
    public void postComment(@RequestBody CommentPost commentPost) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Member loginMember = (Member) authentication.getPrincipal();
        Member sender = memberService.findByEmail(loginMember.getEmail()).get();
        Trip trip = tripService.findByUUID(commentPost.getTripUUID()).get();

        String curDateTime = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss").format(LocalDateTime.now());

        Comment comment = Comment.builder()
                .review(commentPost.getReview())
                .sender(sender)
                .trip(trip)
                .postDate(curDateTime)
                .build();

        commentService.saveComment(comment);

    }


}
