package GraduationProject.TripPlannerZ.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class MemberTeam {

    @Id
    @GeneratedValue
    @Column(name = "memberTeam_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

    // == 그룹 참여 == //
    public static MemberTeam joinMemberTeam(Member member, Team team) {
        MemberTeam memberTeam = new MemberTeam();
        memberTeam.setMember(member);
        memberTeam.setTeam(team);

        if (team.getTeamLeaderId() == null) {
            team.setTeamLeader(member);
        }

        return memberTeam;
    }

    // == 그룹 탈퇴 == //
    public static void exitMemberTeam(Member member, Team team) {
        
    }

    // == 연관 관계편의 메서드 == //
    public void setMember(Member member) {
        this.member = member;
        member.getMemberTeamList().add(this);
    }

    public void setTeam(Team team) {
        this.team = team;
        team.getMemberTeamList().add(this);
    }
}
