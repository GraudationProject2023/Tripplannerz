package GraduationProject.TripPlannerZ.repository;

import GraduationProject.TripPlannerZ.domain.MemberPreference;
import org.springframework.data.jpa.repository.JpaRepository;


public interface MemberPreferenceRepository extends JpaRepository<MemberPreference, Long>, MemberPreferenceCustom {
}
