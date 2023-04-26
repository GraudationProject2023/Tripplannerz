package GraduationProject.TripPlannerZ.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class Location {

    @Id
    @GeneratedValue
    @Column(name = "location_id")
    private Long id;
    private String name;
    private String latitude;
    private String longtitude;
    @Enumerated(EnumType.STRING)
    private LocationType locationType;

    @OneToMany(mappedBy = "location")
    private List<TripLocation> tripLocationList = new ArrayList<>();

    @Builder
    public Location(Long id, String name, String latitude, String longtitude, LocationType locationType, List<TripLocation> tripLocationList) {
        this.id = id;
        this.name = name;
        this.latitude = latitude;
        this.longtitude = longtitude;
        this.locationType = locationType;
        this.tripLocationList = tripLocationList;
    }
}
