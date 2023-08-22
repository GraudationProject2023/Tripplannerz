package GraduationProject.TripPlannerZ.service;

import GraduationProject.TripPlannerZ.config.dto.CredentialDto;
import GraduationProject.TripPlannerZ.config.dto.MemberDto;
import GraduationProject.TripPlannerZ.config.dto.SignUpDto;
import GraduationProject.TripPlannerZ.config.exceptions.AppException;
import GraduationProject.TripPlannerZ.config.mappers.MemberMapper;
import GraduationProject.TripPlannerZ.domain.Member;
import GraduationProject.TripPlannerZ.dto.MemberInfo;
import GraduationProject.TripPlannerZ.dto.MemberTrip;
import GraduationProject.TripPlannerZ.repository.MemberRepository;
import GraduationProject.TripPlannerZ.repository.PartyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.CharBuffer;
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

    // 회원 가입
    @Transactional
    public Long join(Member member) {
        memberRepository.save(member);
        return member.getId();
    }

    @Transactional
    public MemberDto register(SignUpDto signUpDto) {
        Optional<Member> optionalMember = memberRepository.findByEmail(signUpDto.getEmail());

        if (optionalMember.isPresent()) {
            throw new AppException("Login already exists", HttpStatus.BAD_REQUEST);
        }

        Member member = memberMapper.signUptoMember(signUpDto);

        member.setPw(passwordEncoder.encode(CharBuffer.wrap(signUpDto.getPw())));

//        Member savedMember = memberRepository.save(member);
        memberRepository.save(member);
//        memberPreferenceService.setTypes(savedMember, signUpDto.getType());

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

    public MemberDto findByEmail2(String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        return memberMapper.toMemberDto(member);
    }

    public MemberDto login(CredentialDto credentialDto) {
        Member member = memberRepository.findByEmail(credentialDto.getEmail())
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));

        if (passwordEncoder.matches(CharBuffer.wrap(credentialDto.getPw()), member.getPw())) {
            return memberMapper.toMemberDto(member);
        }

        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }


}
