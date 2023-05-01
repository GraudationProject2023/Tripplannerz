package GraduationProject.TripPlannerZ.controller;

import GraduationProject.TripPlannerZ.service.EmailService;
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

    @PostMapping("/members/emailConfirm")
    public ResponseEntity<String> sendEmail(@RequestBody Map<String, String> requestBody) throws MessagingException {
        emailService.sendEmail(requestBody.get("email"));
        return ResponseEntity.ok("이메일을 확인하세요");
    }

    @PostMapping("/members/emailConfirmCode")
    public ResponseEntity<String> checkCode(@RequestParam("email") String email, @RequestParam("code") String code) {
        if (emailService.verifyEmailCode(email, code)) {
            System.out.println("성공");
            emailService.delete(email);
            return ResponseEntity.ok("ok");
        }
        System.out.println("실패");
        return ResponseEntity.ok("no");
    }
}
