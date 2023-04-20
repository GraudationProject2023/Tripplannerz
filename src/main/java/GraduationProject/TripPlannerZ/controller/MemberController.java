package GraduationProject.TripPlannerZ.controller;

import GraduationProject.TripPlannerZ.domain.Member;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"})
@RestController // JSON 형태로 데이터를 반환하는 것
@RequiredArgsConstructor
@Transactional
public class MemberController {

    private final EntityManager em;

    @PostMapping(value = "/members")
    // @PostMapping은 @RequestMapping(value = "/members", method= {RequestMethod.POST}) 와 동일
    public void createMember(@RequestBody MemberVO memberVO) {
        Member joinMember = Member.builder()
                .name(memberVO.getName())
                .pw(memberVO.getPw())
                .email(memberVO.getEmail())
                .gender(memberVO.getGender())
                .phoneNumber(memberVO.getPhoneNumber())
                .build();

        /*
            프론트에서 데이터를 넘길 때에
            name, pw, email, gender, phoneNumber 라는 필드 명은 동일하게 넘어와야함.
            null이 들어와도 DB에 알아서 null로 대입됨
         */

        em.persist(joinMember);
    }
}
