package GraduationProject.TripPlannerZ.controller;

import GraduationProject.TripPlannerZ.domain.Member;
import GraduationProject.TripPlannerZ.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"})
@RestController // JSON 형태로 데이터를 반환하는 것
@RequiredArgsConstructor
@Transactional
@RequestMapping("/api")
public class MemberController {

    private final EntityManager em;
    private final EmailService emailService;

    @PostMapping(value = "/members/join")
    // @PostMapping은 @RequestMapping(value = "/members", method= {RequestMethod.POST}) 와 동일
    public void createMember(@RequestBody MemberJoinDTO memberJoinDTO) {
        Member joinMember = Member.builder()
                .name(memberJoinDTO.getName())
                .pw(memberJoinDTO.getPw())
                .email(memberJoinDTO.getEmail())
                .gender(memberJoinDTO.getGender())
                .phoneNumber(memberJoinDTO.getPhoneNumber())
                .memberTeamList(new ArrayList<>())
                .build();

        /*
            프론트에서 데이터를 넘길 때에
            name, pw, email, gender, phoneNumber 라는 필드 명은 동일하게 넘어와야함.
            null이 들어와도 DB에 알아서 null로 대입됨
         */

        em.persist(joinMember);
    }

    @PostMapping("/members/emailConfirm")
    public ResponseEntity<String> sendVerificationCode(@RequestBody Map<String,String> requestBody) throws MessagingException, UnsupportedEncodingException {
        String email = requestBody.get("email");

        // 이메일 인증 코드 생성
        String verificationCode = emailService.generateVerificationCode(email);

        // 이메일 인증 코드 전송
        emailService.sendVerificationCode(email, verificationCode);

        // 이메일 인증 코드 전송 성공 메시지 반환
        return ResponseEntity.ok().body(verificationCode);
    }
}
