package GraduationProject.TripPlannerZ.Comment;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;

@Entity
@Getter
public class Notification {

    @Id
    @GeneratedValue
    @Column(name = "notification_id")
    Long id;

    private String senderName;
    private String type;
    private String tripUUID;
    private String tripTitle;

    public Notification(String senderName, String tripTitle, String type, String tripUUID) {
        this.senderName = senderName;
        this.tripTitle = tripTitle;
        this.type = type;
        this.tripUUID = tripUUID;
        this.isRead = false;
    }

    @Column(nullable = false)
    private Boolean isRead;
}
