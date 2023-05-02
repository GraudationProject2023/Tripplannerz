package GraduationProject.TripPlannerZ.controller;

import GraduationProject.TripPlannerZ.service.EmailService;
import GraduationProject.TripPlannerZ.service.MemberService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"}, allowCredentials = "true")
@RequestMapping("/api")
public class MailController {

    private final EmailService emailService;
    private final MemberService memberService;

    @PostMapping("/members/emailConfirm")
    public ResponseEntity<String> sendEmail(@RequestBody Map<String, String> requestBody) throws MessagingException {

        String email = requestBody.get("email");
        if(memberService.validateDuplicateMember(email).isPresent()){
            return ResponseEntity.ok().body("{\"result\": false}");
        }

        emailService.sendEmail(email);
        return ResponseEntity.ok("이메일을 확인하세요");
    }

    @PostMapping("/members/emailConfirmCode")
    public ResponseEntity<String> checkCode(@RequestBody Map<String, String> requestBody) {

        String email = requestBody.get("email");
        String code = requestBody.get("emailConfirmCode");

        if (emailService.verifyEmailCode(email, code)) {
            System.out.println("email = " + email);
            System.out.println("성공");
            emailService.delete(email);
            return ResponseEntity.ok().body("{\"result\": true}");
        }
        System.out.println("실패");
        return ResponseEntity.ok().body("{\"result\": false}");
    }

}
