package GraduationProject.TripPlannerZ.controller;

import GraduationProject.TripPlannerZ.domain.Member;
import GraduationProject.TripPlannerZ.domain.MemberTeam;
import GraduationProject.TripPlannerZ.domain.Team;
import GraduationProject.TripPlannerZ.domain.Trip;
import GraduationProject.TripPlannerZ.repository.MemberTeamRepository;
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
    private final MemberTeamRepository memberTeamRepository;

    @PostMapping("/trip/create")
    public void createTrip(@RequestBody TripCreateDTO tripCreateDTO, HttpServletRequest request) {

        // 여행일정 생성
        Trip trip = Trip.builder()
                .title(tripCreateDTO.getTitle())
                .content(tripCreateDTO.getContent())
                .startingDate(tripCreateDTO.getStartingDate())
                .period(tripCreateDTO.getPeriod())
                .build();

        // 멤버 찾기
        HttpSession session = request.getSession(false);
        Member member = (Member) session.getAttribute("loginMember");

        // 일정 생성 누르는 순간 팀이 만들어짐
        Team team = Team.builder()
                .tripList(new ArrayList<>())
                .memberTeamList(new ArrayList<>())
                .build();

        // 멤버와 팀의 연관관계 설정
        MemberTeam memberTeam = MemberTeam.joinMemberTeam(member, team);

        // 팀과 여행일정의 연관관계 설정
        team.setTrip(trip);

        // DB에 저장
        tripService.createTrip(trip);
        teamService.createTeam(team);
        memberTeamRepository.save(memberTeam);
    }

}
