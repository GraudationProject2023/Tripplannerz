package GraduationProject.TripPlannerZ.repository;

import GraduationProject.TripPlannerZ.domain.Party;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PartyRepository extends JpaRepository<Party, Long>, PartyRepositoryCustom {

    public void deleteById(Long userId);
    public Long findByTrip(Long id);
}
