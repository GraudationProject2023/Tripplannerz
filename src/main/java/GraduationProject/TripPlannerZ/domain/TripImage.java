package GraduationProject.TripPlannerZ.domain;


import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Getter
@NoArgsConstructor
public class TripImage {

    @Id
    @GeneratedValue
    @Column(name = "trip_img_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id")
    private Trip trip;

    @Column(unique = true)
    private String img_uuid;

    @Builder
    public TripImage(Trip trip) {
        this.img_uuid = UUID.randomUUID().toString();
        this.setImg(trip);
    }

    // == 연관관계 편의 메서드 ==//
    public void setImg(Trip trip) {
        this.trip = trip;
        trip.getTripImages().add(this);
    }

}
