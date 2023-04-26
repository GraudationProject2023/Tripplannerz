package GraduationProject.TripPlannerZ.controller;


import GraduationProject.TripPlannerZ.domain.Member;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api")
public class LoginController {

    @PostMapping("/members/login")
    public void login(@RequestBody MemberLoginDTO loginMember, HttpServletRequest request, HttpServletResponse response) {

        HttpSession session = request.getSession();

        session.setAttribute("loginMember", loginMember);



    }




}
