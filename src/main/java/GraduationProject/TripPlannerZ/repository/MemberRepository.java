package GraduationProject.TripPlannerZ.repository;

import GraduationProject.TripPlannerZ.domain.Member;
import GraduationProject.TripPlannerZ.domain.Trip;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);


    @Query("select trip from Trip trip join trip.team team join team.memberTeamList mtl join mtl.member m where m.email = :email")
    Page<Trip> findTripListByEmail(@Param("email") String email, Pageable pageable);
}
