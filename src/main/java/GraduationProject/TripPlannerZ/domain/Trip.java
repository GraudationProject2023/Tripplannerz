package GraduationProject.TripPlannerZ.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Trip {

    @Id
    @GeneratedValue
    @Column(name = "trip_id")
    private Long id;
    private String title;
    private String period;
    private String content;
    private boolean publicSetting;
    private String startingDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

    @OneToMany(mappedBy = "trip", cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
    private List<TripLocation> tripLocationList = new ArrayList<>();

    //private Chat chat;

    @Builder
    public Trip(Long id, String title, String startingDate, String period, String content, boolean publicSetting, Team team, List<TripLocation> tripLocationList) {
        this.id = id;
        this.title = title;
        this.startingDate = startingDate;
        this.period = period;
        this.content = content;
        this.publicSetting = publicSetting;
        this.team = team;
        this.tripLocationList = tripLocationList;
    }
}
