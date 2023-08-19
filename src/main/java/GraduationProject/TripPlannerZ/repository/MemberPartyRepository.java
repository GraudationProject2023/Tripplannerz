package GraduationProject.TripPlannerZ.repository;

import GraduationProject.TripPlannerZ.domain.MemberParty;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberPartyRepository extends JpaRepository<MemberParty, Long> {
    List<MemberParty> findAllByPartyId(Long partyId);
}
