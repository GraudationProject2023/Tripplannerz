package GraduationProject.TripPlannerZ.repository;

import GraduationProject.TripPlannerZ.domain.*;
import GraduationProject.TripPlannerZ.dto.member.MemberInfo;
import GraduationProject.TripPlannerZ.dto.member.MemberTrip;
import GraduationProject.TripPlannerZ.dto.member.QMemberInfo;
import GraduationProject.TripPlannerZ.dto.member.QMemberTrip;
import GraduationProject.TripPlannerZ.dto.trip.AccompanyRequest;
import GraduationProject.TripPlannerZ.dto.trip.QAccompanyRequest;
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
import static GraduationProject.TripPlannerZ.comment.QComment.comment;

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
            case "hits":
                content = queryFactory
                        .select(new QMemberTrip(
                                trip.id,
                                trip.UUID,
                                trip.title,
                                trip.startingDate,
                                trip.comingDate,
                                tripImage.img_uuid,
                                trip.currentNum,
                                trip.recruitNum
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

            case "like":
                content = queryFactory
                        .select(new QMemberTrip(
                                trip.id,
                                trip.UUID,
                                trip.title,
                                trip.startingDate,
                                trip.comingDate,
                                tripImage.img_uuid,
                                trip.currentNum,
                                trip.recruitNum
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
                                trip.id,
                                trip.UUID,
                                trip.title,
                                trip.startingDate,
                                trip.comingDate,
                                tripImage.img_uuid,
                                trip.currentNum,
                                trip.recruitNum
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
                        trip.id,
                        trip.UUID,
                        trip.title,
                        trip.startingDate,
                        trip.comingDate,
                        tripImage.img_uuid,
                        trip.currentNum,
                        trip.recruitNum
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

    @Override
    public List<MemberInfo> tripMemberList(Long id) {

        List<MemberInfo> memberInfoList = queryFactory
                .select(new QMemberInfo(
                        member.email,
                        member.name,
                        member.gender
                ))
                .from(member).where(member.in(
                        JPAExpressions
                                .select(memberParty.member)
                                .from(memberParty)
                                .join(memberParty.party, party)
                                .where(party.id.eq(id))
                ))
                .fetch();


        return memberInfoList;
    }

    @Override
    public List<AccompanyRequest> accompanyRequestList(Member creater) {
        return queryFactory
                .select(new QAccompanyRequest(
                        comment.id,
                        comment.trip.title,
                        comment.sender.name,
                        comment.trip.UUID,
                        comment.review
                ))
                .from(comment)
                .where(comment.type.eq("AccompanyRequest").and(comment.trip.in(
                        JPAExpressions
                                .selectFrom(trip)
                                .where(trip.creater.eq(creater))
                )))
                .fetch();
    }

    private BooleanExpression memberPartyIn(Member member) {
        return member != null ? memberParty.member.eq(member) : null;
    }

    private BooleanExpression keywordContains(String keyWord) {
        return keyWord != null ? trip.title.contains(keyWord) : null;
    }
}
