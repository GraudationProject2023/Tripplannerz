package GraduationProject.TripPlannerZ.service;

import GraduationProject.TripPlannerZ.domain.Member;
import GraduationProject.TripPlannerZ.dto.MemberInfo;
import GraduationProject.TripPlannerZ.dto.MemberTrip;
import GraduationProject.TripPlannerZ.repository.MemberRepository;
import GraduationProject.TripPlannerZ.repository.PartyRepository;
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
    private final PartyRepository partyRepository;

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
        List<Long> list = partyRepository.noMemberParty();

        for (Long id : list) {
            partyRepository.deleteById(id);
        }
    }

    // 비밀 번호 변경
    @Transactional
    public void changePw(Member member, String pw) {
        member.changePw(pw);
    }

    // 비밀 번호 찾기
    public boolean findPw(String email, String pw) {
        Member member = memberRepository.findByEmail(email).get();
        return member.getPw().equals(pw);
    }

    public List<MemberInfo> memberList(Long id) {
        return memberRepository.tripMemberList(id);
    }
}
