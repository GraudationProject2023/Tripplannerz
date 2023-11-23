package GraduationProject.TripPlannerZ.repository;

import GraduationProject.TripPlannerZ.domain.Location;
import GraduationProject.TripPlannerZ.domain.Trip;
import GraduationProject.TripPlannerZ.dto.LocationOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface LocationRepository extends JpaRepository<Location, Long>, LocationRepositoryCustom {



}
