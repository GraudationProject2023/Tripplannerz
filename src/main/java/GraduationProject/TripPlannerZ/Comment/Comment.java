package GraduationProject.TripPlannerZ.Comment;

import GraduationProject.TripPlannerZ.domain.Member;
import GraduationProject.TripPlannerZ.domain.Trip;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Comment {

    @Id
    @GeneratedValue
    @Column(name = "comment_id")
    private Long id;

    //sender
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id")
    private Member sender;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id")
    private Trip trip;

    private String content;

    @Builder
    public Comment(Member sender, Trip trip, String content) {
        this.content = content;
        setSender(sender);
        setTrip(trip);
    }

    public void setTrip(Trip trip) {
        this.trip = trip;
    }

    public void setSender(Member sender) {
        this.sender = sender;
    }
}
