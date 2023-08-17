package GraduationProject.TripPlannerZ.Alarm;

import GraduationProject.TripPlannerZ.domain.Member;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@NoArgsConstructor
public class Notification {

    @Id
    @GeneratedValue
    @Column(name = "notification_id")
    private Long id;

    @Embedded
    private NotificationContent content;

    private String url;

    @Column(nullable = false)
    private Boolean isRead;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Member receiver;

    @Builder
    public Notification(Member receiver, String type, String content, String url, Boolean isRead) {
        this.receiver = receiver;
        this.content = new NotificationContent(type, content);
        this.url = url;
        this.isRead = isRead;
    }

    public String getContent() {
        return content.getContent();
    }

    public String getUrl() {
        return this.url;
    }



}
