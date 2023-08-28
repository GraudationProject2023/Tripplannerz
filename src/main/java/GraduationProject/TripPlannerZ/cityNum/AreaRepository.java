package GraduationProject.TripPlannerZ.cityNum;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AreaRepository extends JpaRepository<Area, Integer> {

    Area findByName(String name);
}
