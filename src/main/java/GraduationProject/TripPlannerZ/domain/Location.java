package GraduationProject.TripPlannerZ.domain;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Location {

    @Id
    @GeneratedValue
    @Column(name = "location_id")
    private Long id;

    private String name;
    private double x;
    private double y;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id")
    private Trip trip;

    @Nullable
    private Long orders;

    @Builder
    public Location(String name, double x, double y, Trip trip) {
        this.name = name;
        this.x = x;
        this.y = y;
        setTrip(trip);
    }

    public void setTrip(Trip trip) {
        this.trip = trip;
        trip.getLocationList().add(this);
    }

    public void setOrders(Long orders) {
        this.orders = orders;
    }


}
