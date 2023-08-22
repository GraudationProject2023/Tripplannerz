package GraduationProject.TripPlannerZ.Comment;

import GraduationProject.TripPlannerZ.domain.Member;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;

@Entity
@Getter
public class Notification {

    @Id
    @GeneratedValue
    @Column(name = "notification_id")
    private Long id;

    private String senderName;
    private String tripUUID;
    private String tripTitle;

    private Long senderId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member receivedMember;
    @Column(nullable = false)
    private Boolean isRead;

    @Builder
    public Notification(Comment comment, Member member) {
        this.senderName = comment.getSender().getName();
        this.tripTitle = comment.getTrip().getTitle();
        this.tripUUID = comment.getTrip().getUUID();
        this.receivedMember = member;
        this.isRead = false;
    }
}
