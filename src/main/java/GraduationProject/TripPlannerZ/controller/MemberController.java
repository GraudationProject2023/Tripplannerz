package GraduationProject.TripPlannerZ.controller;

import GraduationProject.TripPlannerZ.config.UserAuthProvider;
import GraduationProject.TripPlannerZ.domain.MemberPreference;
import GraduationProject.TripPlannerZ.dto.member.Credential;
import GraduationProject.TripPlannerZ.dto.member.MemberDto;
import GraduationProject.TripPlannerZ.dto.member.MemberRegister;
import GraduationProject.TripPlannerZ.domain.Member;
import GraduationProject.TripPlannerZ.dto.member.ChangeMemberInfo;
import GraduationProject.TripPlannerZ.delete.MemberLogin;
import GraduationProject.TripPlannerZ.dto.member.MemberTrip;
import GraduationProject.TripPlannerZ.dto.member.MyPage;
import GraduationProject.TripPlannerZ.service.*;


import GraduationProject.TripPlannerZ.service.TripService;
import GraduationProject.TripPlannerZ.sseEmitter.SseEmitterService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;
import java.util.Optional;


@RestController // JSON 형태로 데이터를 반환하는 것
@RequiredArgsConstructor
@RequestMapping("/api")
//@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"}, exposedHeaders = "Authorization")
public class MemberController {

    private final MemberService memberService;
    private final LoginService loginService;
    private final TripService tripService;
    private final MemberPreferenceService memberPreferenceService;
    private final UserAuthProvider userAuthProvider;
    private final SseEmitterService sseEmitterService;
    private final PartyService partyService;



    @PostMapping("/members/register")
    public ResponseEntity<String> register(@RequestBody MemberRegister memberRegister) {
        MemberDto member = memberService.register(memberRegister);

        // 로그인 시에만 토큰 부여
        //member.setToken(userAuthProvider.createToken(member.getEmail()));
        //

        return ResponseEntity.ok().body("{\"result\": true}");
    }

    @PostMapping("/members/loginJWT")
    public ResponseEntity<MemberDto> loginJWT(@RequestBody Credential credential) {
        MemberDto member = memberService.login(credential);
        member.setToken(userAuthProvider.createToken(member.getEmail()));



        return ResponseEntity.ok().body(member);
    }

    @RequestMapping(value = "/sub", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe() {
        // 세션문제 해결하면 주석 제거
//        String memberEmail = (String) request.getSession().getAttribute("loginMember");
//        Long memberId = memberService.findByEmail(memberEmail).get().getId();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Member loginMember = (Member) authentication.getPrincipal();

        return sseEmitterService.subscribe(loginMember.getId());

    }

    @GetMapping("/members/logout")
    public void logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);

        if (session != null)
            session.invalidate();
    }

    @GetMapping("/members/tripInfo")
    public MyPage getMemberTrip() {

//        String email = (String) request.getSession().getAttribute("loginMember");
//        Optional<Member> loginMember = memberService.findByEmail(email);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Member loginMember = (Member) authentication.getPrincipal();
        Member member = memberService.findByEmail(loginMember.getEmail()).get();

        return new MyPage(member);
    }

    @GetMapping("/members/tripList")
    public Page<MemberTrip> getMemberTripList(@RequestParam("page") int page,
                                              @RequestParam("sortType") String sortType) {
//        String email = (String) request.getSession().getAttribute("loginMember");
//        Member member = memberService.findByEmail(email).get();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Member loginMember = (Member) authentication.getPrincipal();
        Member member = memberService.findByEmail(loginMember.getEmail()).get();

        PageRequest pageRequest = PageRequest.of(page, 10);


        return memberService.findTrip(member, sortType, pageRequest, null);
    }

    @PostMapping("members/exit")
    public ResponseEntity<String> exitMember(HttpServletRequest request, @RequestParam("pw") String pw) {

        String email = (String) request.getSession().getAttribute("loginMember");
        Optional<Member> loginMember = memberService.findByEmail(email);
        Member member = loginMember.get();

        if (member.getPw().equals(pw)) {
            memberService.exit(member);
            return ResponseEntity.ok().body("{\"result\": true}");
        } else
            return ResponseEntity.ok().body("{\"result\": false}");

    }

    @RequestMapping("members/verify/pw") // get post 둘다 가능
    public ResponseEntity<String> verifyPw(@RequestBody ChangeMemberInfo memberInfo) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Member loginMember = (Member) authentication.getPrincipal();
        Member member = memberService.findByEmail(loginMember.getEmail()).get();

        if (memberService.findPw(member.getEmail(), memberInfo.getPw())) // 비번 일치
            return ResponseEntity.ok().body("{\"result\": true}");
        return ResponseEntity.ok().body("{\"result\": false}");
    }

    @PostMapping("members/change/pw")
    public void changePw(@RequestBody ChangeMemberInfo memberInfo) {

//        String email = (String) request.getSession().getAttribute("loginMember");
//        Member member = memberService.findByEmail(email).get();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Member loginMember = (Member) authentication.getPrincipal();
        Member member = memberService.findByEmail(loginMember.getEmail()).get();

        memberService.changePw(member, memberInfo.getPw());
    }

    @PostMapping("members/change/types")
    public void changeTypes(HttpServletRequest request, @RequestBody ChangeMemberInfo memberInfo) {

        String email = (String) request.getSession().getAttribute("loginMember");
        Member member = memberService.findByEmail(email).get();

        memberPreferenceService.deleteTypes(member);
        memberPreferenceService.setTypes(member, memberInfo.getTypes());
    }
}
