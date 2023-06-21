package GraduationProject.TripPlannerZ.domain;

import GraduationProject.TripPlannerZ.repository.MemberRepository;
import GraduationProject.TripPlannerZ.repository.PartyRepository;
import GraduationProject.TripPlannerZ.repository.TripRepository;
import jakarta.persistence.EntityManager;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;


@SpringBootTest
@Transactional
@Rollback(value = false)
class MemberPartyTest {

    @Autowired
    PartyRepository partyRepository;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    TripRepository tripRepository;

    @Autowired
    EntityManager em;

    @Test
    public void 멤버_추가(){
        Member newMember=Member.builder()
                .memberPartyList(new ArrayList<>())
                .name("teest1")
                .build();
        memberRepository.save(newMember);

        Trip trip = tripRepository.findById(1L).get();
        Party party = partyRepository.findById(1L).get();

        MemberParty memberParty = MemberParty.addPartyMember(newMember, party);
        em.persist(memberParty);


        Assertions.assertThat(trip.getParty().getMemberPartyList().size()).isEqualTo(2);
    }
}