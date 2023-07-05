package GraduationProject.TripPlannerZ.repository;

import GraduationProject.TripPlannerZ.domain.*;
import GraduationProject.TripPlannerZ.dto.MemberTrip;
import GraduationProject.TripPlannerZ.dto.QMemberTrip;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.StringPath;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

import java.time.LocalDate;
import java.util.List;

import static GraduationProject.TripPlannerZ.domain.QMember.member;
import static GraduationProject.TripPlannerZ.domain.QMemberParty.memberParty;
import static GraduationProject.TripPlannerZ.domain.QParty.party;
import static GraduationProject.TripPlannerZ.domain.QTrip.trip;

public class MemberRepositoryImpl implements MemberRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public MemberRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }


    @Override
    public Page<MemberTrip> tripList(String email, Pageable pageable) {


        //@Query("select trip from Trip trip join trip.team team join team.memberTeamList mtl join mtl.member m where m.email = :email")
        List<MemberTrip> content = queryFactory
                .select(new QMemberTrip(
                        trip.UUID,
                        trip.title,
                        trip.startingDate,
                        trip.comingDate))
                .from(trip)
                .join(trip.party, party)
                .join(party.memberPartyList, memberParty)
                .join(memberParty.member, member)
                .where(member.email.eq(email), trip.startingDate.goe(LocalDate.now().toString()))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Trip> countQuery = queryFactory
                .select(trip)
                .from(trip)
                .join(trip.party, party)
                .join(party.memberPartyList, memberParty)
                .join(memberParty.member, member)
                .where(member.email.eq(email));


        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchCount);
    }

    private BooleanExpression dateCompare(StringPath start) {

        return start.goe(LocalDate.now().toString());
    }
}
