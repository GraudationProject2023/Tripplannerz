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
public class Party {

    @Id
    @GeneratedValue
    @Column(name = "party_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "trip_id")
    private Trip trip;

    @OneToMany(mappedBy = "party")
    private List<MemberParty> memberPartyList = new ArrayList<>();

    @Builder
    public Party(Trip trip, List<MemberParty> memberPartyList) {
        this.trip = trip;
        this.memberPartyList = memberPartyList;
    }

    // == 연관관계 편의 메서드 == //
    public void setTrip(Trip trip){
        this.trip = trip;
    }
}
