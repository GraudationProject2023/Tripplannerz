package GraduationProject.TripPlannerZ.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class Member {

    @Id
    @GeneratedValue
    @Column(name = "member_id")
    private Long id;
    private String name;
    private String pw;
    private String email;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<MemberTeam> memberTeamList = new ArrayList<>();

    @Builder
    public Member(String pw, String email, String name, Gender gender, List<MemberTeam> memberTeamList) {
        this.pw = pw;
        this.email = email;
        this.name = name;
        this.gender = gender;
        this.memberTeamList = memberTeamList;
    }

    // == 회원 탈퇴 == //
    public void exit() {
        /*
            1. 넘겨받은 MemberId로 Service에서 이 함수를 호출 한다.
            2. Repository를 통해 em.remove()를 한다.
         */
        List<MemberTeam> memberTeams = this.getMemberTeamList();

        for (MemberTeam memberTeam : memberTeams) {
            memberTeam.getTeam().getMemberTeamList().remove(memberTeam);
        }
    }
}
