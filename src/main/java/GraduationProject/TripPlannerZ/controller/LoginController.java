package GraduationProject.TripPlannerZ.controller;


import GraduationProject.TripPlannerZ.domain.Member;
import GraduationProject.TripPlannerZ.repository.MemberRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"})
@RequiredArgsConstructor
public class LoginController {


    private final MemberRepository memberRepository;

    @PostMapping("/members/login")
    public void login(@RequestBody MemberLoginDTO loginMember, HttpServletRequest request, HttpServletResponse response, Model model) {

        Optional<Member> member = memberRepository.findByEmail(loginMember.getEmail());

        if (member.isPresent() && member.get().getPw() == loginMember.getPw()) {
            HttpSession session = request.getSession();
            session.setAttribute("loginMember", loginMember);
        } else if (member.isPresent() && member.get().getPw() != loginMember.getPw()){
            model.addAttribute("res", "wrongPw");
        } else {
            model.addAttribute("res", "wrongId");
        }





    }




}
