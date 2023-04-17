package GraduationProject.TripPlannerZ;

import GraduationProject.TripPlannerZ.domain.*;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Component
@RequiredArgsConstructor
public class TestInitDb {

    private final InitService initService;

    @PostConstruct
    public void init() {
        initService.dbInit();
    }

    @Component
    @Transactional
    @RequiredArgsConstructor
    static class InitService {

        private final EntityManager em;

        public void dbInit() {
            // Member 생성
            Member member1 = Member.builder()
                    .pw("1")
                    .email("1@naver.com")
                    .memberTeamList(new ArrayList<>())
                    .build();
            Member member2 = Member.builder()
                    .pw("2")
                    .email("2@naver.com")
                    .memberTeamList(new ArrayList<>())
                    .build();
            Member member3 = Member.builder()
                    .pw("3")
                    .email("3@naver.com")
                    .memberTeamList(new ArrayList<>())
                    .build();
            Member member4 = Member.builder()
                    .pw("4")
                    .email("4@naver.com")
                    .memberTeamList(new ArrayList<>())
                    .build();
            em.persist(member1);
            em.persist(member2);
            em.persist(member3);
            em.persist(member4);

            // Team 생성
            Team team1 = Team.builder()
                    .memberTeamList(new ArrayList<>())
                    .tripList(new ArrayList<>())
                    .build();
            Team team2 = Team.builder()
                    .memberTeamList(new ArrayList<>())
                    .tripList(new ArrayList<>())
                    .build();
            Team team3 = Team.builder()
                    .memberTeamList(new ArrayList<>())
                    .tripList(new ArrayList<>())
                    .build();
            em.persist(team1);
            em.persist(team2);
            em.persist(team3);

            // MemberTeam 생성
            MemberTeam memberTeam1 = MemberTeam.joinMemberTeam(member1, team1); // member1 -> 팀1에 참여하면서 바로 팀리더
            MemberTeam memberTeam2 = MemberTeam.joinMemberTeam(member2, team1); // member2 -> 팀1에 참여
            MemberTeam memberTeam3 = MemberTeam.joinMemberTeam(member3, team1); // member3 -> 팀1에 참여
            MemberTeam memberTeam4 = MemberTeam.joinMemberTeam(member2, team2); // member2 -> 팀2에 참여하면서 바로 팀리더
            MemberTeam memberTeam5 = MemberTeam.joinMemberTeam(member3, team2); // member3 -> 팀2에 참여
            MemberTeam memberTeam6 = MemberTeam.joinMemberTeam(member4, team3); // member4 -> 팀3에 참여하면서 바로 팀리더

            em.persist(memberTeam1);
            em.persist(memberTeam2);
            em.persist(memberTeam3);
            em.persist(memberTeam4);
            em.persist(memberTeam5);
            em.persist(memberTeam6);

            // Location 생성
            Location location1 = Location.builder()
                    .name("서울")
                    .tripLocationList(new ArrayList<>())
                    .build();
            Location location2 = Location.builder()
                    .name("부산")
                    .tripLocationList(new ArrayList<>())
                    .build();
            Location location3 = Location.builder()
                    .name("울산")
                    .tripLocationList(new ArrayList<>())
                    .build();
            Location location4 = Location.builder()
                    .name("대구")
                    .build();

            em.persist(location1);
            em.persist(location2);
            em.persist(location3);
            em.persist(location4);

            // Trip 설정
            Trip trip1 = Trip.builder()
                    .title("3박 4일")
                    .tripLocationList(new ArrayList<>())
                    .build();
            Trip trip2 = Trip.builder()
                    .title("당일")
                    .tripLocationList(new ArrayList<>())
                    .build();
            Trip trip3 = Trip.builder()
                    .title("1박 2일")
                    .tripLocationList(new ArrayList<>())
                    .build();
            Trip trip4 = Trip.builder()
                    .title("일본여행")
                    .tripLocationList(new ArrayList<>())
                    .build();
            Trip trip5 = Trip.builder()
                    .title("미국여행")
                    .tripLocationList(new ArrayList<>())
                    .build();

            team1.setTrip(trip1);
            team1.setTrip(trip2);
            team2.setTrip(trip3);
            team3.setTrip(trip4);
            team3.setTrip(trip5);

            em.persist(trip1);
            em.persist(trip2);
            em.persist(trip3);
            em.persist(trip4);
            em.persist(trip5);

            // 여행지에서 경로 설정
            TripLocation tripLocation1 = TripLocation.setTripLocation(trip1, location1);
            TripLocation tripLocation2 = TripLocation.setTripLocation(trip1, location2);
            TripLocation tripLocation3 = TripLocation.setTripLocation(trip1, location3);
            TripLocation tripLocation4 = TripLocation.setTripLocation(trip1, location4);
            TripLocation tripLocation5 = TripLocation.setTripLocation(trip2, location1);
            TripLocation tripLocation6 = TripLocation.setTripLocation(trip2, location2);
            TripLocation tripLocation7 = TripLocation.setTripLocation(trip3, location3);
            TripLocation tripLocation8 = TripLocation.setTripLocation(trip3, location4);

            em.persist(tripLocation1);
            em.persist(tripLocation2);
            em.persist(tripLocation3);
            em.persist(tripLocation4);
            em.persist(tripLocation5);
            em.persist(tripLocation6);
            em.persist(tripLocation7);
            em.persist(tripLocation8);
        }
    }
}
