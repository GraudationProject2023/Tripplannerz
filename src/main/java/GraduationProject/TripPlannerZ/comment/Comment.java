package GraduationProject.TripPlannerZ.comment;

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

    @Column(columnDefinition = "TEXT")
    private String review;

    private String postDate;

    private String type;

    @Builder
    public Comment(Member sender, Trip trip, String review, String postDate, String type) {
        this.review = review;
        this.postDate = postDate;
        this.type = type;
        setSender(sender);
        setTrip(trip);
    }


    // == 연관 관계 편의 메소드 == //
    public void setTrip(Trip trip) {
        this.trip = trip;
        trip.getComments().add(this);
    }

    public void setSender(Member sender) {
        this.sender = sender;
        sender.getComments().add(this);
    }
}
