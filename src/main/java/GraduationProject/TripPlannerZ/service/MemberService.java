package GraduationProject.TripPlannerZ.service;

import GraduationProject.TripPlannerZ.dto.member.Credential;
import GraduationProject.TripPlannerZ.dto.member.MemberDto;
import GraduationProject.TripPlannerZ.dto.member.MemberRegister;
import GraduationProject.TripPlannerZ.dto.trip.AccompanyRequest;
import GraduationProject.TripPlannerZ.exceptions.AppException;
import GraduationProject.TripPlannerZ.config.mappers.MemberMapper;
import GraduationProject.TripPlannerZ.domain.Member;
import GraduationProject.TripPlannerZ.dto.member.MemberInfo;
import GraduationProject.TripPlannerZ.dto.member.MemberTrip;
import GraduationProject.TripPlannerZ.repository.MemberRepository;
import GraduationProject.TripPlannerZ.repository.PartyRepository;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.CharBuffer;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

//import static GraduationProject.TripPlannerZ.domain.QMember.member;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PartyRepository partyRepository;
    private final MemberMapper memberMapper;
    private final PasswordEncoder passwordEncoder;
    private final MemberPreferenceService memberPreferenceService;
    private final EntityManager em;

    // 회원 가입
    @Transactional
    public Long join(Member member) {
        memberRepository.save(member);
        return member.getId();
    }

    @Transactional
    public MemberDto register(MemberRegister memberRegister) {
        Optional<Member> optionalMember = memberRepository.findByEmail(memberRegister.getEmail());

        if (optionalMember.isPresent()) {
            throw new AppException("Login already exists", HttpStatus.BAD_REQUEST);
        }

        Member member = memberMapper.signUptoMember(memberRegister);
        member.setPw(passwordEncoder.encode(CharBuffer.wrap(memberRegister.getPw())));

        member.setTypes();
        memberPreferenceService.setTypes(member, memberRegister.getTypes());

        memberRepository.save(member);

        return memberMapper.toMemberDto(member);

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
//        member.exit();
        memberRepository.delete(member);
//        List<Long> list = partyRepository.noMemberParty();
//
//        for (Long id : list) {
//            partyRepository.deleteById(id);
//        }
    }

    // 비밀 번호 변경
    @Transactional
    public void changePw(Member member, String pw) {
        member.changePw(passwordEncoder.encode(CharBuffer.wrap(pw)));
//        em.clear();

    }

    // 비밀 번호 찾기
    public boolean findPw(String email, String pw) {

        Member member = memberRepository.findByEmail(email).get();
//        System.out.println(passwordEncoder.encode(CharBuffer.wrap(pwArr)));
        return passwordEncoder.matches(pw, member.getPw());
    }

    public List<MemberInfo> memberList(Long id) {
        return memberRepository.tripMemberList(id);
    }

    public MemberDto findByEmail2(String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        return memberMapper.toMemberDto(member);
    }

    public MemberDto login(Credential credential) {
        Member member = memberRepository.findByEmail(credential.getEmail())
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));

        if (passwordEncoder.matches(CharBuffer.wrap(credential.getPw()), member.getPw())) {
            return memberMapper.toMemberDto(member);
        }

        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }

    public List<AccompanyRequest> accompanyRequestList(Member creater) {
        return memberRepository.accompanyRequestList(creater);
    }


}
