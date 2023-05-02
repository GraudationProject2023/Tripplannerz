package GraduationProject.TripPlannerZ.service;

import GraduationProject.TripPlannerZ.domain.Member;
import GraduationProject.TripPlannerZ.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final MemberRepository memberRepository;

    public Member Login(String email, String pw) {
        Optional<Member> member = memberRepository.findByEmail(email);

        // 존재하지 않는 회원
        if (member.isEmpty())
            return null;

        // 비밀번호 불일치
        if (!member.get().getPw().equals(pw))
            return null;

        return member.get();
    }
}
