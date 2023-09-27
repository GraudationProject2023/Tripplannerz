package GraduationProject.TripPlannerZ.repository;

import GraduationProject.TripPlannerZ.domain.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;


public interface TripRepository extends JpaRepository<Trip, Long>, TripRepositoryCustom {
    Optional<Trip> findByUUID(String id);

}
