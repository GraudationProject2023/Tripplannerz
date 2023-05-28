package GraduationProject.TripPlannerZ.domain;

import jakarta.persistence.*;
import lombok.Setter;

@Entity
@Setter
public class MemberPreference {
    @Id
    @GeneratedValue
    @Column(name = "member_preference_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private Integer type;

    @Enumerated(EnumType.STRING)
    private Rank rank;

    // == Member 선호도 설정 == //
    static public MemberPreference setTypes(String mp, Member member, int rank) {

        MemberPreference memberPreference = new MemberPreference();
        memberPreference.setMember(member);
        memberPreference.setRank(Rank.getRank(rank));

        if (PreferenceType.SIGHTSEEING.toString().equals(mp))
            memberPreference.setType(12);
        else if (PreferenceType.CULTURE.toString().equals(mp))
            memberPreference.setType(14);
        else if (PreferenceType.FESTIVAL.toString().equals(mp))
            memberPreference.setType(15);
        else if (PreferenceType.LEISURE.toString().equals(mp))
            memberPreference.setType(28);
        else if (PreferenceType.VACATION.toString().equals(mp))
            memberPreference.setType(32);
        else if (PreferenceType.SHOPPING.toString().equals(mp))
            memberPreference.setType(38);
        else if (PreferenceType.RESTAURANT.toString().equals(mp))
            memberPreference.setType(39);

        return memberPreference;
    }

    // == 연관관계 편의 메서드 == //
    public void setMember(Member member) {
        this.member = member;
        member.getTypes().add(this);
    }
}
