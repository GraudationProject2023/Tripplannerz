package GraduationProject.TripPlannerZ.controller;


import GraduationProject.TripPlannerZ.domain.Member;
import GraduationProject.TripPlannerZ.service.LoginService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"}, allowCredentials = "true")
@RequiredArgsConstructor
public class LoginController {

    private final LoginService loginService;

    @PostMapping("/members/login")
    public ResponseEntity<String> login(@RequestBody MemberLoginDTO loginMember, HttpServletRequest request) {

        Member member = loginService.Login(loginMember.getEmail(), loginMember.getPw());

        if (member == null) // 이메일이 존재하지 않거나, 비밀번호가 일치하지 않음
            return ResponseEntity.ok().body("{\"result\": false}");

        // 로그인 성공 처리
        /*
            서버 -> 클라
            1. 서버에서 세션을 만든다. (Key : sessionId, Value : 회원 객체)
            2. 생성된 세션ID(랜덤 값)를 쿠키로 전달 한다.
            <클라이언트 별로 세션을 만들기 때문에 클라이언트가 실행될 때마다 모두 다른 세션을 만든다.>
            3. 로그 아웃시에는 reqeust.getSession(false)를 실행하여 세션을 새로 만드는 일이 없도록 방지한다.

            클라 -> 서버
            1. 클라이언트는 항상 쿠키를 전달한다.
            2. 세션 저장소에서 쿠키를 조회해서 로그인시 보관한 세션 정보를 사용한다.
         */

        // 없으면 새로 생성, 있다면 기존에 있는 것 반환
        HttpSession session = request.getSession(true);

        // 세션에 로그인한 회원 정보 보관
        session.setAttribute("loginMember", member);

        return ResponseEntity.ok().body("{\"result\": true}");

    }
}