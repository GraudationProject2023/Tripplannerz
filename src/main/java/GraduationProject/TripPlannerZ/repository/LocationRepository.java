package GraduationProject.TripPlannerZ.repository;

import GraduationProject.TripPlannerZ.domain.Location;
import GraduationProject.TripPlannerZ.domain.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;
import java.util.Optional;

public interface LocationRepository extends JpaRepository<Location, Long> {

    ArrayList<Location> findByTrip(Trip trip);

}
