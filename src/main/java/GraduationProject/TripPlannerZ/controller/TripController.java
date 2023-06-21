package GraduationProject.TripPlannerZ.controller;

import GraduationProject.TripPlannerZ.CityNum.Area;
import GraduationProject.TripPlannerZ.CityNum.Sigungu;
import GraduationProject.TripPlannerZ.CityNum.SigunguRepository;
import GraduationProject.TripPlannerZ.domain.*;
import GraduationProject.TripPlannerZ.dto.TripCreate;
import GraduationProject.TripPlannerZ.repository.MemberPartyRepository;
import GraduationProject.TripPlannerZ.service.MemberService;
import GraduationProject.TripPlannerZ.service.PartyService;
import GraduationProject.TripPlannerZ.service.TripService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"}, allowCredentials = "true")
public class TripController {

    private final TripService tripService;
    private final MemberService memberService;
    private final PartyService partyService;
    private final MemberPartyRepository memberPartyRepository;
    private final SigunguRepository sigunguRepository;

    @PostMapping("/trip/create")
    public void createTrip(@RequestBody TripCreate tripCreate, HttpServletRequest request) {

        // 멤버 찾기
        HttpSession session = request.getSession(false);
        String email = (String) session.getAttribute("loginMember");
        Member member = memberService.findByEmail(email).get();

        // 해당 멤버가 group 생성
        Party party = Party.builder()
                .memberPartyList(new ArrayList<>())
                .build();
        partyService.createParty(party);

        MemberParty memberParty = MemberParty.addPartyMember(member, party);

        // 도시 번호 지정
        Sigungu sigungu = sigunguRepository.findByName(tripCreate.getSigunguName());
        Area area = sigungu.getArea();

        // group에서 여행 일정 생성
        Trip trip = Trip.builder()
                .title(tripCreate.getTitle())
                .tripImage(new ArrayList<>())
                .recruitNum(tripCreate.getRecruitNum())
                .startingDate(tripCreate.getStartingDate())
                .comingDate(tripCreate.getComingDate())
                .closeRecruitDate(tripCreate.getCloseRecruitDate())
                .party(party)
                .areaCode(area.getCode())
                .sigunguCode(sigungu.getCode())
                .build();
        // 이미지 넣기 추가


        memberPartyRepository.save(memberParty);
        tripService.createTrip(trip);
    }
}
