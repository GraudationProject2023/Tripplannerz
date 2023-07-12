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
    @Column(unique = true)
    private String email;
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<MemberPreference> types = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<MemberParty> memberPartyList = new ArrayList<>();

    @Builder
    public Member(String pw, String email, String name, Gender gender, List<MemberPreference> types, List<MemberParty> memberPartyList) {
        this.pw = pw;
        this.email = email;
        this.name = name;
        this.gender = gender;
        this.types = types;
        this.memberPartyList = memberPartyList;
    }

    // == 회원 탈퇴 == //
    public void exit() {
        /*
            1. 넘겨받은 MemberId로 Service에서 이 함수를 호출 한다.
            2. Repository를 통해 em.remove()를 한다.
         */
        List<MemberParty> memberParties = this.getMemberPartyList();

        for (MemberParty memberParty : memberParties) {
            memberParty.getParty().getMemberPartyList().remove(memberParty);
        }
    }

    // == 비밀 번호 변경 == //
    public void changePw(String pw) {
        this.pw = pw;
    }

    // == 선호테그 변경 == //
    public void changePreference(List<MemberPreference> types) {
        if (types != null)
            this.types = types;
    }
}
