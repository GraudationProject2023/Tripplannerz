package GraduationProject.TripPlannerZ.CityNum;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SigunguRepository extends JpaRepository<Sigungu, Integer> {

    Sigungu findByName(String name);
}
