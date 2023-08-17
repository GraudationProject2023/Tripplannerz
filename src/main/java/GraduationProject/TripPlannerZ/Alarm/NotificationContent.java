package GraduationProject.TripPlannerZ.Alarm;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Embeddable
@Getter
@AllArgsConstructor
public class NotificationContent {
    private String type;
    private String content;
}
