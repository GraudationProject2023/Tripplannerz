package GraduationProject.TripPlannerZ.controller;

import GraduationProject.TripPlannerZ.domain.Member;
import GraduationProject.TripPlannerZ.domain.MemberTeam;
import GraduationProject.TripPlannerZ.domain.Team;
import GraduationProject.TripPlannerZ.domain.Trip;
import GraduationProject.TripPlannerZ.repository.MemberTeamRepository;
import GraduationProject.TripPlannerZ.service.MemberService;
import GraduationProject.TripPlannerZ.service.TeamService;
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
    private final TeamService teamService;
    private final MemberService memberService;
    private final MemberTeamRepository memberTeamRepository;

    @PostMapping("/trip/create")
    public void createTrip(@RequestBody TripCreateDTO tripCreateDTO, HttpServletRequest request) {

        // 멤버 찾기
        HttpSession session = request.getSession(false);
        String email = (String) session.getAttribute("loginMember");
        Member member = memberService.findByEmail(email).get();

        // 여행일정 생성
        Trip trip = Trip.builder()
                .title(tripCreateDTO.getTitle())
                .content(tripCreateDTO.getContent())
                .startingDate(tripCreateDTO.getStartingDate())
                .period(tripCreateDTO.getPeriod())
                .build();

        // 일정 생성 누르는 순간 팀이 만들어짐
        Team team = Team.builder()
                .tripList(new ArrayList<>())
                .memberTeamList(new ArrayList<>())
                .build();

        // 팀과 여행일정의 연관관계 설정
        team.setTrip(trip);

        // 멤버와 팀의 연관관계 설정
        MemberTeam memberTeam = MemberTeam.joinMemberTeam(member, team);

        // DB에 저장
        teamService.createTeam(team);
        tripService.createTrip(trip);
        memberTeamRepository.save(memberTeam);
    }
}
