package GraduationProject.TripPlannerZ.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class MemberParty {

    @Id
    @GeneratedValue
    @Column(name = "member_party_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "party_id")
    private Party party;

    // == 생성 메서드 == //
    static MemberParty newTrip(Member member, Party party) {
        MemberParty memberParty = new MemberParty();
        memberParty.setMember(member);
        memberParty.setParty(party);

        return memberParty;
    }

    // == 연관관계 편의 메서드 == //
    public void setMember(Member member) {
        this.member = member;
        member.getMemberPartyList().add(this);
    }

    public void setParty(Party party) {
        this.party = party;
        party.getMemberPartyList().add(this);
    }
}
