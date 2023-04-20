package GraduationProject.TripPlannerZ.repository;

import GraduationProject.TripPlannerZ.domain.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TripRepository extends JpaRepository<Trip, Long> {
}
