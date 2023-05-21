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
                    .name("admin")
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
                    .content("1")
                    .tripLocationList(new ArrayList<>())
                    .build();
            Trip trip2 = Trip.builder()
                    .title("당일")
                    .content("2")
                    .tripLocationList(new ArrayList<>())
                    .build();
            Trip trip3 = Trip.builder()
                    .title("1박 2일")
                    .content("3")
                    .tripLocationList(new ArrayList<>())
                    .build();
            Trip trip4 = Trip.builder()
                    .title("일본여행")
                    .content("4")
                    .tripLocationList(new ArrayList<>())
                    .build();
            Trip trip5 = Trip.builder()
                    .title("미국여행")
                    .content("5")
                    .tripLocationList(new ArrayList<>())
                    .build();
            Trip trip6 = Trip.builder()
                    .title("미국여행")
                    .content("6")
                    .tripLocationList(new ArrayList<>())
                    .build();
            Trip trip7 = Trip.builder()
                    .title("미국여행")
                    .content("7")
                    .tripLocationList(new ArrayList<>())
                    .build();
            Trip trip8 = Trip.builder()
                    .title("미국여행")
                    .content("8")
                    .tripLocationList(new ArrayList<>())
                    .build();
            Trip trip9 = Trip.builder()
                    .title("미국여행")
                    .content("9")
                    .tripLocationList(new ArrayList<>())
                    .build();
            Trip trip10 = Trip.builder()
                    .title("미국여행")
                    .content("10")
                    .tripLocationList(new ArrayList<>())
                    .build();
            Trip trip11 = Trip.builder()
                    .title("미국여행")
                    .content("11")
                    .tripLocationList(new ArrayList<>())
                    .build();
            Trip trip12 = Trip.builder()
                    .title("미국여행")
                    .content("12")
                    .tripLocationList(new ArrayList<>())
                    .build();
            Trip trip13 = Trip.builder()
                    .title("미국여행")
                    .content("13")
                    .tripLocationList(new ArrayList<>())
                    .build();
            Trip trip14 = Trip.builder()
                    .title("미국여행")
                    .content("14")
                    .tripLocationList(new ArrayList<>())
                    .build();
            Trip trip15 = Trip.builder()
                    .title("미국여행")
                    .content("15")
                    .tripLocationList(new ArrayList<>())
                    .build();
            Trip trip16 = Trip.builder()
                    .title("미국여행")
                    .content("16")
                    .tripLocationList(new ArrayList<>())
                    .build();

            team1.setTrip(trip6);
            team1.setTrip(trip7);
            team1.setTrip(trip8);
            team1.setTrip(trip9);
            team1.setTrip(trip10);
            team1.setTrip(trip11);
            team1.setTrip(trip12);
            team1.setTrip(trip13);
            team1.setTrip(trip14);
            team1.setTrip(trip15);
            team1.setTrip(trip16);
            em.persist(trip1);
            em.persist(trip2);
            em.persist(trip3);
            em.persist(trip4);
            em.persist(trip5);
            em.persist(trip6);
            em.persist(trip7);
            em.persist(trip8);
            em.persist(trip9);
            em.persist(trip10);
            em.persist(trip11);
            em.persist(trip12);
            em.persist(trip13);
            em.persist(trip14);
            em.persist(trip15);
            em.persist(trip16);

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

            Trip t1 = Trip.builder()
                    .title("t1")
                    .content("test1")
                    .period("1")
                    .startingDate("1111.11.11")
                    .tripLocationList(new ArrayList<>())
                    .build();
            Trip t2 = Trip.builder()
                    .title("t2")
                    .content("test2")
                    .period("1")
                    .startingDate("1112.11.11")
                    .tripLocationList(new ArrayList<>())
                    .build();
            Trip t3 = Trip.builder()
                    .title("t3")
                    .content("test3")
                    .period("1")
                    .startingDate("1113.11.11")
                    .tripLocationList(new ArrayList<>())
                    .build();
            Trip t4 = Trip.builder()
                    .title("t4")
                    .content("test4")
                    .period("1")
                    .startingDate("1114.11.11")
                    .tripLocationList(new ArrayList<>())
                    .build();
            Trip t5 = Trip.builder()
                    .title("t5")
                    .content("test5")
                    .period("1")
                    .startingDate("1115.11.11")
                    .tripLocationList(new ArrayList<>())
                    .build();
            Trip t6 = Trip.builder()
                    .title("t6")
                    .content("test6")
                    .period("30")
                    .startingDate("1116.11.11")
                    .tripLocationList(new ArrayList<>())
                    .build();
            Trip t7 = Trip.builder()
                    .title("t7")
                    .content("test7")
                    .period("7")
                    .startingDate("1117.11.11")
                    .tripLocationList(new ArrayList<>())
                    .build();
            Trip t8 = Trip.builder()
                    .title("t8")
                    .content("test8")
                    .period("6")
                    .startingDate("1118.11.11")
                    .tripLocationList(new ArrayList<>())
                    .build();
            Trip t9 = Trip.builder()
                    .title("t9")
                    .content("test9")
                    .period("5")
                    .startingDate("1119.11.11")
                    .tripLocationList(new ArrayList<>())
                    .build();
            Trip t10 = Trip.builder()
                    .title("t10")
                    .content("test10")
                    .period("4")
                    .startingDate("1111.11.11")
                    .tripLocationList(new ArrayList<>())
                    .build();
            Trip t11 = Trip.builder()
                    .title("t11")
                    .content("test11")
                    .period("3")
                    .startingDate("1121.11.11")
                    .tripLocationList(new ArrayList<>())
                    .build();
            Trip t12 = Trip.builder()
                    .title("t2")
                    .content("test12")
                    .period("3")
                    .startingDate("1121.11.11")
                    .tripLocationList(new ArrayList<>())
                    .build();
            Trip t13 = Trip.builder()
                    .title("t13")
                    .content("test13")
                    .period("9")
                    .startingDate("1131.11.11")
                    .tripLocationList(new ArrayList<>())
                    .build();
            Trip t14 = Trip.builder()
                    .title("t14")
                    .content("test14")
                    .period("11")
                    .startingDate("1141.11.11")
                    .tripLocationList(new ArrayList<>())
                    .build();
            Trip t15 = Trip.builder()
                    .title("t15")
                    .content("test15")
                    .period("12")
                    .startingDate("1151.11.11")
                    .tripLocationList(new ArrayList<>())
                    .build();
            Trip t16 = Trip.builder()
                    .title("t16")
                    .content("test16")
                    .period("13")
                    .startingDate("1161.11.11")
                    .tripLocationList(new ArrayList<>())
                    .build();
            Trip t17 = Trip.builder()
                    .title("t17")
                    .content("test17")
                    .period("14")
                    .startingDate("1171.11.11")
                    .tripLocationList(new ArrayList<>())
                    .build();
            Trip t18 = Trip.builder()
                    .title("t18")
                    .content("test18")
                    .period("6")
                    .startingDate("1181.11.11")
                    .tripLocationList(new ArrayList<>())
                    .build();
            Trip t19 = Trip.builder()
                    .title("t19")
                    .content("test19")
                    .period("40")
                    .startingDate("1191.11.11")
                    .tripLocationList(new ArrayList<>())
                    .build();
            Trip t20 = Trip.builder()
                    .title("t20")
                    .content("test20")
                    .period("12")
                    .startingDate("1201.11.11")
                    .tripLocationList(new ArrayList<>())
                    .build();


            team1.setTrip(t1);
            em.persist(t1);
            team1.setTrip(t2);
            em.persist(t2);
            team1.setTrip(t3);
            em.persist(t3);
            team1.setTrip(t4);
            em.persist(t4);
            team1.setTrip(t5);
            em.persist(t5);
            team1.setTrip(t6);
            em.persist(t6);
            team1.setTrip(t7);
            em.persist(t7);
            team1.setTrip(t8);
            em.persist(t8);
            team1.setTrip(t9);
            em.persist(t9);
            team1.setTrip(t10);
            em.persist(t10);
            team1.setTrip(t11);
            em.persist(t11);
            team1.setTrip(t12);
            em.persist(t12);
            team1.setTrip(t13);
            em.persist(t13);
            team1.setTrip(t14);
            em.persist(t14);
            team1.setTrip(t15);
            em.persist(t15);
            team1.setTrip(t16);
            em.persist(t16);
            team1.setTrip(t17);
            em.persist(t17);
            team1.setTrip(t18);
            em.persist(t18);
            team1.setTrip(t19);
            em.persist(t19);
            team1.setTrip(t20);
            em.persist(t20);


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
