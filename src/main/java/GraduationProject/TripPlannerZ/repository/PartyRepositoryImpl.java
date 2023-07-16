package GraduationProject.TripPlannerZ.repository;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;

import java.util.ArrayList;
import java.util.List;

import static GraduationProject.TripPlannerZ.domain.QMemberParty.memberParty;
import static GraduationProject.TripPlannerZ.domain.QParty.party;


public class PartyRepositoryImpl implements PartyRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public PartyRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<Long> noMemberParty() {
        List<Long> noMemberPartyList = new ArrayList<>();

        List<Tuple> list = queryFactory
                .select(party.id, memberParty.id)
                .from(party)
                .leftJoin(memberParty).on(party.eq(memberParty.party))
                .fetch();

        for (Tuple tuple : list) {
            Long memberPartyId = tuple.get(memberParty.id);
            Long partyId = tuple.get(party.id);


            if (memberPartyId == null) {
                noMemberPartyList.add(partyId);
            }
        }
        return noMemberPartyList;
    }
}
