package GraduationProject.TripPlannerZ.repository;

import GraduationProject.TripPlannerZ.domain.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TripRepository extends JpaRepository<Trip, Long> {
    Optional<Trip> findByUUID(String id);
}
