package GraduationProject.TripPlannerZ.Alarm;

import GraduationProject.TripPlannerZ.domain.Member;
import GraduationProject.TripPlannerZ.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"}, allowCredentials = "true")
@RequestMapping("/api")
public class NotificationController {

    private final NotificationService notificationService;
    private final MemberService memberService;

    @GetMapping(value = "/subscribe", produces = "text/event-stream")
    @ResponseStatus(HttpStatus.OK)
    public SseEmitter subscribe(HttpServletRequest request,
                                @RequestHeader(value = "Last-Event-ID", required = false, defaultValue = "") String lastEventId) {

        String email = (String) request.getSession().getAttribute("loginMember");
        Optional<Member> loginMember = memberService.findByEmail(email);
        Member member = loginMember.get();

        return notificationService.subscribe(member.getId(), lastEventId);
    }

}
