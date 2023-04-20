package GraduationProject.TripPlannerZ.repository;

import GraduationProject.TripPlannerZ.domain.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface LocationRepository extends JpaRepository<Location, Long> {

    @Query("select l from Location l where l.latitude = :latitude And l.longtitude = :longtitude")
    Optional<Location> findLocation(@Param("latitude") String latitude, @Param("longtitude") String longtitude);
}
