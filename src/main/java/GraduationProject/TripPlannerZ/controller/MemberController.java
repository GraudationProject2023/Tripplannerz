package GraduationProject.TripPlannerZ.controller;

import GraduationProject.TripPlannerZ.domain.Member;
import GraduationProject.TripPlannerZ.domain.MemberParty;
import GraduationProject.TripPlannerZ.domain.MemberPreference;
import GraduationProject.TripPlannerZ.domain.Trip;
import GraduationProject.TripPlannerZ.dto.MemberJoin;
import GraduationProject.TripPlannerZ.repository.MemberPreferenceRepository;
import GraduationProject.TripPlannerZ.service.LoginService;
import GraduationProject.TripPlannerZ.service.MemberService;

import GraduationProject.TripPlannerZ.service.TripService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@RestController // JSON 형태로 데이터를 반환하는 것
@RequiredArgsConstructor
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"}, allowCredentials = "true")
public class MemberController {

    private final MemberService memberService;
    private final LoginService loginService;
    private final TripService tripService;
    private final MemberPreferenceRepository memberPreferenceRepository;

    @PostMapping("/members/join")
    // @PostMapping은 @RequestMapping(value = "/members", method= {RequestMethod.POST}) 와 동일
    public void createMember(@RequestBody MemberJoin memberJoin) {
        Member joinMember = Member.builder()
                .name(memberJoin.getName())
                .pw(memberJoin.getPw())
                .email(memberJoin.getEmail())
                .gender(memberJoin.getGender())
                .types(new ArrayList<>())
                .build();

        memberService.join(joinMember);

        String[] preferenceList = memberJoin.getTypes().split(",");

        for (int i = 0; i < preferenceList.length; i++) {
            MemberPreference memberPreference = MemberPreference.setTypes(preferenceList[i], joinMember, i);
            memberPreferenceRepository.save(memberPreference);
        }


        /*
            프론트에서 데이터를 넘길 때에
            name, pw, email, gender, phoneNumber 라는 필드 명은 동일하게 넘어와야함.
            null이 들어와도 DB에 알아서 null로 대입됨
         */
    }

    @PostMapping("/members/login")
    public ResponseEntity<String> login(@RequestBody MemberLoginDTO loginMember, HttpServletRequest request) {

        Member member = loginService.Login(loginMember.getEmail(), loginMember.getPw());

        System.out.println("=======================");
        List<MemberParty> memberPartyList = member.getMemberPartyList();
        System.out.println("memberPartyList.size() = " + memberPartyList.size());
        for (MemberParty memberParty : memberPartyList) {
            System.out.println("memberParty = " + memberParty);
        }
        System.out.println("=======================");

        if (member == null) // 이메일이 존재하지 않거나, 비밀번호가 일치하지 않음
            return ResponseEntity.ok().body("{\"result\": false}");

        // 로그인 성공 처리
        /*
            서버 -> 클라
            1. 서버에서 세션을 만든다. (Key : sessionId, Value : 회원 객체)
            2. 생성된 세션ID(랜덤 값)를 쿠키로 전달 한다.
            <클라이언트 별로 세션을 만들기 때문에 클라이언트가 실행될 때마다 모두 다른 세션을 만든다.>
            3. 로그 아웃시에는 reqeust.getSession(false)를 실행하여 세션을 새로 만드는 일이 없도록 방지한다.

            클라 -> 서버
            1. 클라이언트는 항상 쿠키를 전달한다.
            2. 세션 저장소에서 쿠키를 조회해서 로그인시 보관한 세션 정보를 사용한다.
         */

        // 없으면 새로 생성, 있다면 기존에 있는 것 반환
        HttpSession session = request.getSession(true);

        // 세션에 로그인한 회원 정보 보관
        session.setAttribute("loginMember", member.getEmail());

        String responseBody = "{\"result\": true, \"name\": \"" + member.getName() + "\"}";
        return ResponseEntity.ok().body(responseBody);

    }

    @GetMapping("/members/logout")
    public void logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);

        if (session != null)
            session.invalidate();
    }

//    @GetMapping("/members/trip")
//    public MemberTripTotalDTO searchTrip(HttpServletRequest request,
//                                         @RequestParam(required = false, name = "page", defaultValue = "0") int pageNum,
//                                         // @RequestParam은 Json데이터 처리 x
//                                         @RequestParam(required = false, name = "size", defaultValue = "2") int pageSize) {
//        HttpSession session = request.getSession(false);
//        String email = (String) session.getAttribute("loginMember");
//        if (pageNum > 0)
//            pageNum--;
//
//        Pageable pageable = PageRequest.of(pageNum, pageSize);
//        Page<Trip> trippage = memberService.findTrip(email, pageable);
//        List<Trip> trips = trippage.getContent();
//
//        Long total = trippage.getTotalElements();
//        List<MemberTripTitleDTO> result = trips.stream()
//                .map(trip -> new MemberTripTitleDTO(trip))
//                .collect(Collectors.toList());
//
//        return new MemberTripTotalDTO(result, total);
//    }

    @GetMapping("/members/trip/result")
    public MemberTripContentDTO searchTrip(@RequestParam("id") String id) {

        Trip trip = tripService.findByUUID(id).get();
        return new MemberTripContentDTO(trip);

    }
}
