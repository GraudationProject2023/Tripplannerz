package GraduationProject.TripPlannerZ;

import GraduationProject.TripPlannerZ.cityNum.Area;
import GraduationProject.TripPlannerZ.cityNum.AreaRepository;
import GraduationProject.TripPlannerZ.cityNum.Sigungu;
import GraduationProject.TripPlannerZ.domain.Member;
import GraduationProject.TripPlannerZ.domain.MemberParty;
import GraduationProject.TripPlannerZ.domain.Party;
import GraduationProject.TripPlannerZ.domain.Trip;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Component
@RequiredArgsConstructor
public class TestInitDb {
    // test
    private final InitService initService;


    @PostConstruct
    public void init() {
        initService.dbInit();
        initService.setCityNum();
        initService.setSeoul();
        initService.setInCheon();
        initService.setDaeJeon();
        initService.setDaeGu();
        initService.setGwangJu();
    }


    @Component
    @Transactional
    @RequiredArgsConstructor
    static class InitService {

        private final EntityManager em;
        private final AreaRepository areaRepository;
        private final PasswordEncoder passwordEncoder;

        public void dbInit() {
            // Member 생성
            Member member = Member.builder()
                    .name("1")
                    .email("1@naver.com")
                    .pw(passwordEncoder.encode("1"))
                    .types(new ArrayList<>())
                    .madeTripList(new ArrayList<>())
                    .memberPartyList(new ArrayList<>())
                    .build();
            em.persist(member);

            Member member2 = Member.builder()
                    .name("2")
                    .email("2@naver.com")
                    .pw(passwordEncoder.encode("2"))
                    .types(new ArrayList<>())
                    .madeTripList(new ArrayList<>())
                    .memberPartyList(new ArrayList<>())
                    .build();
            em.persist(member2);

            // party 생성
            Party party = Party.builder()
                    .memberPartyList(new ArrayList<>())
                    .build();
            em.persist(party);

            Party party1 = Party.builder()
                    .memberPartyList(new ArrayList<>())
                    .build();
            em.persist(party1);

            Party party2 = Party.builder()
                    .memberPartyList(new ArrayList<>())
                    .build();
            em.persist(party2);

            Party party3 = Party.builder()
                    .memberPartyList(new ArrayList<>())
                    .build();
            em.persist(party3);

            Party party4 = Party.builder()
                    .memberPartyList(new ArrayList<>())
                    .build();
            em.persist(party4);

            Party party5 = Party.builder()
                    .memberPartyList(new ArrayList<>())
                    .build();
            em.persist(party5);

//            Party party6 = Party.builder()
//                    .memberPartyList(new ArrayList<>())
//                    .build();
//            em.persist(party6);

            MemberParty memberParty = MemberParty.addPartyMember(member, party);
            MemberParty memberParty1 = MemberParty.addPartyMember(member, party1);
            MemberParty memberParty2 = MemberParty.addPartyMember(member, party2);
            MemberParty memberParty3 = MemberParty.addPartyMember(member, party3);
            MemberParty memberParty4 = MemberParty.addPartyMember(member, party4);
            MemberParty memberParty5 = MemberParty.addPartyMember(member, party5);
//            MemberParty memberParty6 = MemberParty.addPartyMember(member, party6);
            MemberParty memberParty7 = MemberParty.addPartyMember(member2, party);
            em.persist(memberParty);
            em.persist(memberParty1);
            em.persist(memberParty2);
            em.persist(memberParty3);
            em.persist(memberParty4);
            em.persist(memberParty5);
//            em.persist(memberParty6);
            em.persist(memberParty7);

            //em.persist(memberParty1);

            Trip trip = Trip.builder()
                    .comingDate("2023-05-05")
                    .startingDate("2027-05-01")
                    .title("서울여행")
                    .areaCode(1)
                    .tripImage(new ArrayList<>())
                    .recruitNum(4)
                    .currentNum(1)
                    .party(party)
                    .closeRecruitDate("2023-04-11")
                    .creater(member)
                    .build();
            em.persist(trip);

            Trip trip1 = Trip.builder()
                    .comingDate("2023-05-05")
                    .startingDate("2027-05-01")
                    .title("제주")
                    .areaCode(1)
                    .tripImage(new ArrayList<>())
                    .recruitNum(4)
                    .currentNum(1)
                    .party(party1)
                    .creater(member)
                    .closeRecruitDate("2023-04-11")
                    .build();
            em.persist(trip1);

            Trip trip2 = Trip.builder()
                    .comingDate("2023-05-05")
                    .startingDate("2027-05-01")
                    .title("부산")
                    .areaCode(1)
                    .tripImage(new ArrayList<>())
                    .recruitNum(4)
                    .currentNum(1)
                    .party(party2)
                    .creater(member)
                    .closeRecruitDate("2023-04-11")
                    .build();
            em.persist(trip2);

            Trip trip3 = Trip.builder()
                    .comingDate("2023-05-05")
                    .startingDate("2027-05-01")
                    .title("대구")
                    .areaCode(1)
                    .tripImage(new ArrayList<>())
                    .recruitNum(4)
                    .currentNum(1)
                    .party(party3)
                    .creater(member)
                    .closeRecruitDate("2023-04-11")
                    .build();
            em.persist(trip3);

            Trip trip4 = Trip.builder()
                    .comingDate("2023-05-05")
                    .startingDate("2027-05-01")
                    .title("대전")
                    .areaCode(1)
                    .tripImage(new ArrayList<>())
                    .recruitNum(4)
                    .currentNum(1)
                    .party(party4)
                    .creater(member)
                    .closeRecruitDate("2023-04-11")
                    .build();
            em.persist(trip4);

            Trip trip5 = Trip.builder()
                    .comingDate("2023-05-05")
                    .startingDate("2027-05-01")
                    .title("울산")
                    .areaCode(1)
                    .tripImage(new ArrayList<>())
                    .recruitNum(4)
                    .currentNum(1)
                    .party(party5)
                    .creater(member)
                    .closeRecruitDate("2023-04-11")
                    .build();
            em.persist(trip5);

        }

        public void setCityNum() {
            Area area1 = Area.builder()
                    .code(1)
                    .name("서울")
                    .sigunguList(new ArrayList<>())
                    .build();

            Area area2 = Area.builder()
                    .code(2)
                    .name("인천")
                    .sigunguList(new ArrayList<>())
                    .build();

            Area area3 = Area.builder()
                    .code(3)
                    .name("대전")
                    .sigunguList(new ArrayList<>())
                    .build();

            Area area4 = Area.builder()
                    .code(4)
                    .name("대구")
                    .sigunguList(new ArrayList<>())
                    .build();

            Area area5 = Area.builder()
                    .code(5)
                    .name("광주")
                    .sigunguList(new ArrayList<>())
                    .build();

            Area area6 = Area.builder()
                    .code(6)
                    .name("부산")
                    .sigunguList(new ArrayList<>())
                    .build();

            Area area7 = Area.builder()
                    .code(7)
                    .name("울산")
                    .sigunguList(new ArrayList<>())
                    .build();

            Area area8 = Area.builder()
                    .code(8)
                    .name("세종특별자치시")
                    .sigunguList(new ArrayList<>())
                    .build();

            Area area9 = Area.builder()
                    .code(31)
                    .name("경기도")
                    .sigunguList(new ArrayList<>())
                    .build();

            Area area10 = Area.builder()
                    .code(32)
                    .name("강원도")
                    .sigunguList(new ArrayList<>())
                    .build();

            Area area11 = Area.builder()
                    .code(33)
                    .name("충청북도")
                    .sigunguList(new ArrayList<>())
                    .build();

            Area area12 = Area.builder()
                    .code(34)
                    .name("충청남도")
                    .sigunguList(new ArrayList<>())
                    .build();

            Area area13 = Area.builder()
                    .code(35)
                    .name("경상북도")
                    .sigunguList(new ArrayList<>())
                    .build();

            Area area14 = Area.builder()
                    .code(36)
                    .name("경상남도")
                    .sigunguList(new ArrayList<>())
                    .build();

            Area area15 = Area.builder()
                    .code(37)
                    .name("전라북도")
                    .sigunguList(new ArrayList<>())
                    .build();

            Area area16 = Area.builder()
                    .code(38)
                    .name("전라남도")
                    .sigunguList(new ArrayList<>())
                    .build();

            Area area17 = Area.builder()
                    .code(39)
                    .name("제주도")
                    .sigunguList(new ArrayList<>())
                    .build();

            em.persist(area1);
            em.persist(area2);
            em.persist(area3);
            em.persist(area4);
            em.persist(area5);
            em.persist(area6);
            em.persist(area7);
            em.persist(area8);
            em.persist(area9);
            em.persist(area10);
            em.persist(area11);
            em.persist(area12);
            em.persist(area13);
            em.persist(area14);
            em.persist(area15);
            em.persist(area16);
            em.persist(area17);
        }

        public void setSeoul() {
            Area area = areaRepository.findByName("서울");

            Sigungu s1 = Sigungu.builder()
                    .code(1)
                    .name("강남구")
                    .area(area)
                    .build();

            Sigungu s2 = Sigungu.builder()
                    .code(2)
                    .name("강동구")
                    .area(area)
                    .build();
            Sigungu s3 = Sigungu.builder()
                    .code(3)
                    .name("강북구")
                    .area(area)
                    .build();
            Sigungu s4 = Sigungu.builder()
                    .code(4)
                    .name("강서구")
                    .area(area)
                    .build();
            Sigungu s5 = Sigungu.builder()
                    .code(5)
                    .name("관악구")
                    .area(area)
                    .build();
            Sigungu s6 = Sigungu.builder()
                    .code(6)
                    .name("광진구")
                    .area(area)
                    .build();
            Sigungu s7 = Sigungu.builder()
                    .code(7)
                    .name("구로구")
                    .area(area)
                    .build();
            Sigungu s8 = Sigungu.builder()
                    .code(8)
                    .name("금천구")
                    .area(area)
                    .build();
            Sigungu s9 = Sigungu.builder()
                    .code(9)
                    .name("노원구")
                    .area(area)
                    .build();
            Sigungu s10 = Sigungu.builder()
                    .code(1)
                    .name("도봉구")
                    .area(area)
                    .build();
            Sigungu s11 = Sigungu.builder()
                    .code(1)
                    .name("동대문구")
                    .area(area)
                    .build();
            Sigungu s12 = Sigungu.builder()
                    .code(1)
                    .name("동작구")
                    .area(area)
                    .build();
            Sigungu s13 = Sigungu.builder()
                    .code(13)
                    .name("마포구")
                    .area(area)
                    .build();
            Sigungu s14 = Sigungu.builder()
                    .code(14)
                    .name("서대문구")
                    .area(area)
                    .build();
            Sigungu s15 = Sigungu.builder()
                    .code(15)
                    .name("서초구")
                    .area(area)
                    .build();
            Sigungu s16 = Sigungu.builder()
                    .code(16)
                    .name("성동구")
                    .area(area)
                    .build();
            Sigungu s17 = Sigungu.builder()
                    .code(17)
                    .name("구로구")
                    .area(area)
                    .build();
            Sigungu s18 = Sigungu.builder()
                    .code(18)
                    .name("송파구")
                    .area(area)
                    .build();
            Sigungu s19 = Sigungu.builder()
                    .code(19)
                    .name("양천구")
                    .area(area)
                    .build();
            Sigungu s20 = Sigungu.builder()
                    .code(20)
                    .name("영등포구")
                    .area(area)
                    .build();
            Sigungu s21 = Sigungu.builder()
                    .code(21)
                    .name("용산구")
                    .area(area)
                    .build();
            Sigungu s22 = Sigungu.builder()
                    .code(22)
                    .name("은평구")
                    .area(area)
                    .build();
            Sigungu s23 = Sigungu.builder()
                    .code(23)
                    .name("종로구")
                    .area(area)
                    .build();
            Sigungu s24 = Sigungu.builder()
                    .code(24)
                    .name("중구")
                    .area(area)
                    .build();
            Sigungu s25 = Sigungu.builder()
                    .code(25)
                    .name("중랑구")
                    .area(area)
                    .build();

            em.persist(s1);
            em.persist(s2);
            em.persist(s3);
            em.persist(s4);
            em.persist(s5);
            em.persist(s6);
            em.persist(s7);
            em.persist(s8);
            em.persist(s9);
            em.persist(s10);
            em.persist(s11);
            em.persist(s12);
            em.persist(s13);
            em.persist(s14);
            em.persist(s15);
            em.persist(s16);
            em.persist(s17);
            em.persist(s18);
            em.persist(s19);
            em.persist(s20);
            em.persist(s21);
            em.persist(s22);
            em.persist(s23);
            em.persist(s24);
            em.persist(s25);

        }

        public void setInCheon() {
            Area area = areaRepository.findByName("인천");

            Sigungu s1 = Sigungu.builder()
                    .code(1)
                    .name("강화군")
                    .area(area)
                    .build();

            Sigungu s2 = Sigungu.builder()
                    .code(2)
                    .name("계양구")
                    .area(area)
                    .build();

            Sigungu s3 = Sigungu.builder()
                    .code(3)
                    .name("미추홀구")
                    .area(area)
                    .build();

            Sigungu s4 = Sigungu.builder()
                    .code(4)
                    .name("남동구")
                    .area(area)
                    .build();

            Sigungu s5 = Sigungu.builder()
                    .code(5)
                    .name("동구")
                    .area(area)
                    .build();

            Sigungu s6 = Sigungu.builder()
                    .code(6)
                    .name("부평구")
                    .area(area)
                    .build();

            Sigungu s7 = Sigungu.builder()
                    .code(7)
                    .name("서구")
                    .area(area)
                    .build();

            Sigungu s8 = Sigungu.builder()
                    .code(8)
                    .name("연수구")
                    .area(area)
                    .build();
            Sigungu s9 = Sigungu.builder()
                    .code(9)
                    .name("옹진군")
                    .area(area)
                    .build();

            Sigungu s10 = Sigungu.builder()
                    .code(10)
                    .name("중구")
                    .area(area)
                    .build();

            em.persist(s1);
            em.persist(s2);
            em.persist(s3);
            em.persist(s4);
            em.persist(s5);
            em.persist(s6);
            em.persist(s7);
            em.persist(s8);
            em.persist(s9);
            em.persist(s10);

        }

        public void setDaeJeon() {

            Area area = areaRepository.findByName("대전");
            em.persist(area);

            Sigungu s1 = Sigungu.builder()
                    .code(1)
                    .name("대덕구")
                    .area(area)
                    .build();

            Sigungu s2 = Sigungu.builder()
                    .code(2)
                    .name("동구")
                    .area(area)
                    .build();

            Sigungu s3 = Sigungu.builder()
                    .code(3)
                    .name("서구")
                    .area(area)
                    .build();

            Sigungu s4 = Sigungu.builder()
                    .code(4)
                    .name("유성구")
                    .area(area)
                    .build();

            Sigungu s5 = Sigungu.builder()
                    .code(5)
                    .name("중구")
                    .area(area)
                    .build();

            em.persist(s1);
            em.persist(s2);
            em.persist(s3);
            em.persist(s4);
            em.persist(s5);


        }

        public void setDaeGu() {
            Area area = areaRepository.findByName("대구");
            em.persist(area);

            Sigungu s1 = Sigungu.builder()
                    .code(1)
                    .name("남구")
                    .area(area)
                    .build();

            Sigungu s2 = Sigungu.builder()
                    .code(2)
                    .name("달서구")
                    .area(area)
                    .build();

            Sigungu s3 = Sigungu.builder()
                    .code(3)
                    .name("달성군")
                    .area(area)
                    .build();

            Sigungu s4 = Sigungu.builder()
                    .code(4)
                    .name("동구")
                    .area(area)
                    .build();

            Sigungu s5 = Sigungu.builder()
                    .code(5)
                    .name("북구")
                    .area(area)
                    .build();

            Sigungu s6 = Sigungu.builder()
                    .code(6)
                    .name("서구")
                    .area(area)
                    .build();

            Sigungu s7 = Sigungu.builder()
                    .code(7)
                    .name("수성구")
                    .area(area)
                    .build();

            Sigungu s8 = Sigungu.builder()
                    .code(8)
                    .name("중구")
                    .area(area)
                    .build();

            em.persist(s1);
            em.persist(s2);
            em.persist(s3);
            em.persist(s4);
            em.persist(s5);
            em.persist(s6);
            em.persist(s7);
            em.persist(s8);
        }

        public void setGwangJu() {
            Area area = areaRepository.findByName("광주");
            em.persist(area);

            Sigungu s1 = Sigungu.builder()
                    .code(1)
                    .name("광산구")
                    .area(area)
                    .build();
            Sigungu s2 = Sigungu.builder()
                    .code(2)
                    .name("남구")
                    .area(area)
                    .build();
            Sigungu s3 = Sigungu.builder()
                    .code(3)
                    .name("동구")
                    .area(area)
                    .build();
            Sigungu s4 = Sigungu.builder()
                    .code(4)
                    .name("북구")
                    .area(area)
                    .build();
            Sigungu s5 = Sigungu.builder()
                    .code(5)
                    .name("서구")
                    .area(area)
                    .build();

            em.persist(s1);
            em.persist(s2);
            em.persist(s3);
            em.persist(s4);
            em.persist(s5);
        }

    }

}
