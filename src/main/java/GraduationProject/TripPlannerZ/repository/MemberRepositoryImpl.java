package GraduationProject.TripPlannerZ.repository;

import GraduationProject.TripPlannerZ.domain.*;
import GraduationProject.TripPlannerZ.dto.MemberTrip;
import GraduationProject.TripPlannerZ.dto.QMemberTrip;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
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
import static GraduationProject.TripPlannerZ.domain.QTripImage.tripImage;

public class MemberRepositoryImpl implements MemberRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public MemberRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }


    @Override
    public Page<MemberTrip> tripList(Member member, String sortType, Pageable pageable, String keyWord) {


        //@Query("select trip from Trip trip join trip.team team join team.memberTeamList mtl join mtl.member m where m.email = :email")
        List<MemberTrip> content;

        switch (sortType) {
            case "조회수":
                content = queryFactory
                        .select(new QMemberTrip(
                                trip.UUID,
                                trip.title,
                                trip.startingDate,
                                trip.comingDate,
                                tripImage.img_uuid
                        ))
                        .from(trip).where(trip.party.in(
                                JPAExpressions
                                        .select(memberParty.party)
                                        .from(memberParty)
                                        .where(
                                                memberPartyIn(member)
                                        )
                        ))
                        .leftJoin(tripImage).on(trip.eq(tripImage.trip))
                        .where(
                                trip.startingDate.gt(LocalDate.now().toString()),
                                keywordContains(keyWord)
                                //trip.eq(tripImage.trip)
                        )
                        .orderBy(trip.hits.desc())
                        .offset(pageable.getOffset())
                        .limit(pageable.getPageSize())
                        .fetch();
                break;

            case "좋아요":
                content = queryFactory
                        .select(new QMemberTrip(
                                trip.UUID,
                                trip.title,
                                trip.startingDate,
                                trip.comingDate,
                                tripImage.img_uuid
                        ))
                        .from(trip).where(trip.party.in(
                                JPAExpressions
                                        .select(memberParty.party)
                                        .from(memberParty)
                                        .where(
                                                memberPartyIn(member)
                                        )
                        ))
                        .leftJoin(tripImage).on(trip.eq(tripImage.trip))
                        .where(
                                trip.startingDate.gt(LocalDate.now().toString()),
                                keywordContains(keyWord)
                                //trip.eq(tripImage.trip)
                        )
                        .orderBy(trip.likes.desc())
                        .offset(pageable.getOffset())
                        .limit(pageable.getPageSize())
                        .fetch();
                break;

            default:
                content = queryFactory
                        .select(new QMemberTrip(
                                trip.UUID,
                                trip.title,
                                trip.startingDate,
                                trip.comingDate,
                                tripImage.img_uuid
                        ))
                        .from(trip).where(trip.party.in(
                                JPAExpressions
                                        .select(memberParty.party)
                                        .from(memberParty)
                                        .where(
                                                memberPartyIn(member)
                                        )
                        ))
                        .leftJoin(tripImage).on(trip.eq(tripImage.trip))
                        .where(
                                trip.startingDate.gt(LocalDate.now().toString()),
                                keywordContains(keyWord)
                                //trip.eq(tripImage.trip)
                        )
                        .orderBy(trip.creationTime.desc())
                        .offset(pageable.getOffset())
                        .limit(pageable.getPageSize())
                        .fetch();
                break;
        }

        JPAQuery<MemberTrip> countQuery = queryFactory
                .select(new QMemberTrip(
                        trip.UUID,
                        trip.title,
                        trip.startingDate,
                        trip.comingDate,
                        tripImage.img_uuid
                ))
                .from(trip).where(trip.party.in(
                        JPAExpressions
                                .select(memberParty.party)
                                .from(memberParty)
                                .where(
                                        memberPartyIn(member)
                                )
                ))
                .leftJoin(tripImage).on(trip.eq(tripImage.trip))
                .where(
                        trip.startingDate.gt(LocalDate.now().toString()),
                        keywordContains(keyWord)
                        //trip.eq(tripImage.trip)
                );


        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchCount);
    }

    private BooleanExpression memberPartyIn(Member member) {
        return member != null ? memberParty.member.eq(member) : null;
    }

    private BooleanExpression keywordContains(String keyWord) {
        return keyWord != null ? trip.title.contains(keyWord) : null;
    }
}
