package GraduationProject.TripPlannerZ.repository;

import GraduationProject.TripPlannerZ.domain.*;
import jakarta.persistence.EntityManager;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Optional;

@SpringBootTest
@Transactional
class MemberRepositoryTest {
    @Autowired
    MemberRepository memberRepository;

    @Autowired
    TeamRepository teamRepository;

    @Autowired
    TripRepository tripRepository;

    @Autowired
    EntityManager em;

    @Autowired
    LocationRepository locationRepository;

    @Test
    public void MemberRepositoryTest() {
        Member member = Member.builder()
                .name("123").build();
        Member saveMember = memberRepository.save(member);

        Assertions.assertThat(member.getId()).isEqualTo(saveMember.getId());
    }

    @Test
    public void 위치_중복저장_체크(){
        Location location1 = Location.builder()
                .latitude("1")
                .longtitude("1")
                .tripLocationList(new ArrayList<>())
                .build();
        locationRepository.save(location1);
        em.flush();
        em.clear();

        Location location2 = Location.builder()
                .latitude("1")
                .longtitude("1")
                .tripLocationList(new ArrayList<>())
                .build();

        Optional<Location> newLocation = locationRepository.findLocation(location2.getLatitude(), location2.getLongtitude());

        Assertions.assertThat(newLocation.isPresent()).isTrue();
    }
}
