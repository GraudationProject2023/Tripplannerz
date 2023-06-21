package GraduationProject.TripPlannerZ.CityNum;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AreaRepository extends JpaRepository<Area, Integer> {

    Area findByName(String name);
}
