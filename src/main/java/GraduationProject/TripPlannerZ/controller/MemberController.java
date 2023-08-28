package GraduationProject.TripPlannerZ.controller;

import GraduationProject.TripPlannerZ.config.UserAuthProvider;
import GraduationProject.TripPlannerZ.dto.member.Credential;
import GraduationProject.TripPlannerZ.dto.member.MemberDto;
import GraduationProject.TripPlannerZ.dto.member.MemberRegister;
import GraduationProject.TripPlannerZ.domain.Member;
import GraduationProject.TripPlannerZ.dto.member.ChangeMemberInfo;
import GraduationProject.TripPlannerZ.delete.MemberLogin;
import GraduationProject.TripPlannerZ.dto.member.MemberTrip;
import GraduationProject.TripPlannerZ.dto.member.MyPage;
import GraduationProject.TripPlannerZ.service.LoginService;
import GraduationProject.TripPlannerZ.service.MemberPreferenceService;
import GraduationProject.TripPlannerZ.service.MemberService;

import GraduationProject.TripPlannerZ.service.TripService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController // JSON 형태로 데이터를 반환하는 것
@RequiredArgsConstructor
@RequestMapping("/api")
//@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"}, exposedHeaders = "Authorization")
public class MemberController {

    private final MemberService memberService;
    private final LoginService loginService;
    private final TripService tripService;
    private final MemberPreferenceService memberPreferenceService;
    private final UserAuthProvider userAuthProvider;


    @PostMapping("/members/register")
    public ResponseEntity<String> register(@RequestBody MemberRegister memberRegister) {
        MemberDto member = memberService.register(memberRegister);

        // 로그인 시에만 토큰 부여
        //member.setToken(userAuthProvider.createToken(member.getEmail()));

        return ResponseEntity.ok().body("{\"result\": true}");
    }

    @PostMapping("/members/loginJWT")
    public ResponseEntity<String> loginJWT(@RequestBody Credential credential) {
        MemberDto member = memberService.login(credential);
        member.setToken(userAuthProvider.createToken(member.getEmail()));

        return ResponseEntity.ok().body("{\"result\": true}");
    }

    @GetMapping("/members/logout")
    public void logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);

        if (session != null)
            session.invalidate();
    }

    @GetMapping("/members/tripInfo")
    public MyPage getMemberTrip(HttpServletRequest request) {

        String email = (String) request.getSession().getAttribute("loginMember");
        Optional<Member> loginMember = memberService.findByEmail(email);
        Member member = loginMember.get();

        return new MyPage(member);


    }

    @GetMapping("/members/tripList")
    public Page<MemberTrip> getMemberTripList(HttpServletRequest request,
                                              @RequestParam("page") int page,
                                              @RequestParam("sortType") String sortType) {
        String email = (String) request.getSession().getAttribute("loginMember");
        Member member = memberService.findByEmail(email).get();

        PageRequest pageRequest = PageRequest.of(page, 10);


        return memberService.findTrip(member, sortType, pageRequest, null);
    }

    @PostMapping("members/exit")
    public ResponseEntity<String> exitMember(HttpServletRequest request, @RequestParam("pw") String pw) {

        String email = (String) request.getSession().getAttribute("loginMember");
        Optional<Member> loginMember = memberService.findByEmail(email);
        Member member = loginMember.get();

        if (member.getPw().equals(pw)) {
            memberService.exit(member);
            return ResponseEntity.ok().body("{\"result\": true}");
        } else
            return ResponseEntity.ok().body("{\"result\": false}");

    }

    @RequestMapping("members/verify/pw") // get post 둘다 가능
    public ResponseEntity<String> verifyPw(HttpServletRequest request, @RequestBody ChangeMemberInfo memberInfo) {

        String email = (String) request.getSession().getAttribute("loginMember");
        String pw = memberInfo.getPw();

        if (memberService.findPw(email, pw)) // 비번 일치
            return ResponseEntity.ok().body("{\"result\": true}");
        return ResponseEntity.ok().body("{\"result\": false}");
    }

    @PostMapping("members/change/pw")
    public void changePw(HttpServletRequest request, @RequestBody ChangeMemberInfo memberInfo) {

        String email = (String) request.getSession().getAttribute("loginMember");
        Member member = memberService.findByEmail(email).get();

        memberService.changePw(member, memberInfo.getPw());
    }

    @PostMapping("members/change/types")
    public void changeTypes(HttpServletRequest request, @RequestBody ChangeMemberInfo memberInfo) {

        String email = (String) request.getSession().getAttribute("loginMember");
        Member member = memberService.findByEmail(email).get();

        memberPreferenceService.deleteTypes(member);
        memberPreferenceService.setTypes(member, memberInfo.getTypes());
    }


//    @PostMapping("/members/join")
//    // @PostMapping은 @RequestMapping(value = "/members", method= {RequestMethod.POST}) 와 동일
//    public void createMember(@RequestBody MemberJoin memberJoin) {
//        Member joinMember = Member.builder()
//                .name(memberJoin.getName())
//                .pw(memberJoin.getPw())
//                .email(memberJoin.getEmail())
//                .gender(memberJoin.getGender())
//                .types(new ArrayList<>())
//                .build();
//
//        memberService.join(joinMember);
//        memberPreferenceService.setTypes(joinMember, memberJoin.getTypes());
//
//        /*
//            프론트에서 데이터를 넘길 때에
//            name, pw, email, gender, phoneNumber 라는 필드 명은 동일하게 넘어와야함.
//            null이 들어와도 DB에 알아서 null로 대입됨
//         */
//    }

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

//    @GetMapping("/members/trip/result")
//    public MemberTripContentDTO searchTrip(@RequestParam("id") String id) {
//
//        Trip trip = tripService.findByUUID(id).get();
//        return new MemberTripContentDTO(trip);
//
//    }

    @PostMapping("/members/login")
    public ResponseEntity<String> login(@RequestBody MemberLogin loginMember, HttpServletRequest request) {

        Member member = loginService.Login(loginMember.getEmail(), loginMember.getPw());

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
}
