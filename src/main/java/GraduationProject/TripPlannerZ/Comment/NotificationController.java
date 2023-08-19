package GraduationProject.TripPlannerZ.Comment;


import GraduationProject.TripPlannerZ.domain.Member;
import GraduationProject.TripPlannerZ.domain.Trip;
import GraduationProject.TripPlannerZ.repository.MemberPartyRepository;
import GraduationProject.TripPlannerZ.service.MemberService;
import GraduationProject.TripPlannerZ.service.PartyService;
import GraduationProject.TripPlannerZ.service.TripService;
import com.fasterxml.jackson.core.JsonProcessingException;
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
//@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"}, allowCredentials = "true")
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


    @CrossOrigin
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
        emitters.put(1L, sseEmitter);

        System.out.println(emitters.get(1L));

        sseEmitter.onCompletion(() -> emitters.remove(1L));
        sseEmitter.onTimeout(() -> emitters.remove(1L));
        sseEmitter.onError((e) -> emitters.remove(1L));

        return sseEmitter;
    }

    @PostMapping("/sendComment")
    public void commentAndNotify(HttpServletRequest request, @RequestParam("content") String content) {
        Member member = memberService.findByEmail("1@naver.com").get();
        Notification n = new Notification(member.getName(), "comment", "abc", "서울여행");

        ObjectMapper objectMapper = new ObjectMapper();


        try {
            String nJson = objectMapper.writeValueAsString(n);
            emitters.get(member.getId()).send(SseEmitter.event().name("comment").data(nJson));
        } catch (IOException e) {
            emitters.remove(1L);
        }


    }


}

