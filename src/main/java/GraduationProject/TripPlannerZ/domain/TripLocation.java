package GraduationProject.TripPlannerZ.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class TripLocation {

    @Id
    @GeneratedValue
    @Column(name = "tripLocation_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id")
    private Trip trip;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id")
    private Location location;

    // == 경유지 설정 메서드 == //
    public static TripLocation setTripLocation(Trip trip, Location location) {
        TripLocation tripLocation = new TripLocation();
        tripLocation.setTrip(trip);
        tripLocation.setLocation(location);
        // repository에서 위도 경도가 같은 location이 있는지 확인하는 절차 필요

        return tripLocation;
    }

    // == 경유지 삭제 메서드 == //
    public static void removeTripLocation(Trip trip, Location location) {

    }

    // == 연관관계 편의 메소드 == //
    public void setTrip(Trip trip) {
        this.trip = trip;
        trip.getTripLocationList().add(this);
    }
}
