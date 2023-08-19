package GraduationProject.TripPlannerZ.repository;

import GraduationProject.TripPlannerZ.domain.MemberParty;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@SpringBootTest
@Transactional
class MemberPartyRepositoryTest {

    @Autowired
    MemberPartyRepository memberPartyRepository;

    @Test
    public void print() {
        List<MemberParty> allById = memberPartyRepository.findAllByPartyId(1L);
        for (MemberParty memberParty : allById) {
            System.out.println("memberParty = " + memberParty.getMember().getEmail());
        }


    }
}