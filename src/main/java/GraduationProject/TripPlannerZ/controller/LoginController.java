package GraduationProject.TripPlannerZ.controller;


import GraduationProject.TripPlannerZ.domain.Member;
import GraduationProject.TripPlannerZ.repository.MemberRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"})
@RequiredArgsConstructor
public class LoginController {


    private final MemberRepository memberRepository;

    @PostMapping("/members/login")
    public ResponseEntity<String> login(@RequestBody MemberLoginDTO loginMember, HttpServletRequest request) {

        Optional<Member> member = memberRepository.findByEmail(loginMember.getEmail());

        // 존재하지 않는 회원
        if (member.isEmpty()) {
            return ResponseEntity.ok().body("{\"result\": inValidMember}");
        }

        // 비밀번호 불일치
        if (member.isPresent() && member.get().getPw() != loginMember.getPw()) {
            return ResponseEntity.ok().body("{\"result\": PwError}");
        }

        HttpSession session = request.getSession();
        session.setAttribute("loginMember", loginMember);
        return ResponseEntity.ok().body("{\"result\": true}");

    }
}