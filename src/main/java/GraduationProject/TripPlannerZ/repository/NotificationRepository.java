package GraduationProject.TripPlannerZ.repository;

import GraduationProject.TripPlannerZ.domain.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
}
