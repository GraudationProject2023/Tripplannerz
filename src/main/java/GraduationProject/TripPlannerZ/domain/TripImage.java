package GraduationProject.TripPlannerZ.domain;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class TripImage {

    @Id @GeneratedValue
    @Column(name = "trip_img_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id")
    private Trip trip;

    @Column(unique = true)
    private String img_uuid;


}
