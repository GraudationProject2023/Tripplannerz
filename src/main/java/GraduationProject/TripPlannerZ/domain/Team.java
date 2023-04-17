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

    @OneToMany(mappedBy = "team", cascade = CascadeType.REMOVE)
    private List<MemberTeam> memberTeamList = new ArrayList<>();

    @OneToMany(mappedBy = "team", cascade = CascadeType.REMOVE)
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

    // == 멤버가 팀에서 탈퇴 == //
    public void exit() {
        this.getMemberTeamList().remove(this);
    }
}
