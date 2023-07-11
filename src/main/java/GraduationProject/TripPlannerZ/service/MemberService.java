package GraduationProject.TripPlannerZ.service;

import GraduationProject.TripPlannerZ.domain.Member;
import GraduationProject.TripPlannerZ.domain.MemberPreference;
import GraduationProject.TripPlannerZ.dto.MemberTrip;
import GraduationProject.TripPlannerZ.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    // 회원 가입
    @Transactional
    public Long join(Member member) {
        memberRepository.save(member);
        return member.getId();
    }

    // 중복 회원 검색
    public Optional<Member> findByEmail(String email) {
        return memberRepository.findByEmail(email);
    }

    // 여행 일정 검색
    public Page<MemberTrip> findTrip(Member member, String sortType, Pageable pageable, String keyWord) {
        return memberRepository.tripList(member, sortType, pageable, keyWord);
    }

    // 회원 탈퇴
    @Transactional
    public void exit(Member member) {
        member.exit();
        memberRepository.delete(member);
    }

    // 회원 정보 수정
    @Transactional
    public void modify(String email, String pw, List<MemberPreference> types) {
        Member member = memberRepository.findByEmail(email).get();

        member.changePw(pw);
        member.changePreference(types);
    }
}
