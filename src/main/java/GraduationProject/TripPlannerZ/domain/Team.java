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
public class Team {

    @Id
    @GeneratedValue
    @Column(name = "team_id")
    private Long id;

    private Long teamLeaderId;

    @OneToMany(mappedBy = "team")
    private List<MemberTeam> memberTeamList = new ArrayList<>();

    @OneToMany(mappedBy = "team")
    private List<Trip> tripList = new ArrayList<>();

    @Builder
    public Team(Long id, Long teamLeaderId, List<MemberTeam> memberTeamList, List<Trip> tripList) {
        this.id = id;
        this.teamLeaderId = teamLeaderId;
        this.memberTeamList = memberTeamList;
        this.tripList = tripList;
    }

    // == 팀리더 변경 == //
    public void setTeamLeader(Member member) {
        this.teamLeaderId = member.getId();
    }

    // ==연관관계 편의 메서드== //
    public void setTrip(Trip trip) {
        trip.setTeam(this);
        this.getTripList().add(trip);
    }
}
