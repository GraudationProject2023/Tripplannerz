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
    private String pw;
    private String email;
    private String name;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private String phoneNumber;

    @OneToMany(mappedBy = "member")
    private List<MemberTeam> memberTeamList = new ArrayList<>();

    @Builder
    public Member(String pw, String email, String name, Gender gender, String phoneNumber, List<MemberTeam> memberTeamList) {
        this.pw = pw;
        this.email = email;
        this.name = name;
        this.gender = gender;
        this.phoneNumber = phoneNumber;
        this.memberTeamList = memberTeamList;
    }
}
