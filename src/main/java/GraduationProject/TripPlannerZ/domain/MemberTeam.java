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
    public void exitMemberTeam() {
        /*
            1. Repository에서 Member Id와 Team Id를 파라미터로 받아서 memberTeam을 조회
            2. Service에서 memberTeam.exitMemberTeam()을 통해 그룹 탈퇴함수에 접근
            3. em.remove() 실행
        */
        this.member.getMemberTeamList().remove(this);
        this.team.getMemberTeamList().remove(this);
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
