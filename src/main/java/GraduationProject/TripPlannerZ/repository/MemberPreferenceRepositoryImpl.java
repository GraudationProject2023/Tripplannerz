package GraduationProject.TripPlannerZ.repository;

import GraduationProject.TripPlannerZ.domain.Member;
import GraduationProject.TripPlannerZ.domain.MemberPreference;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;

import java.util.List;

import static GraduationProject.TripPlannerZ.domain.QMember.member;
import static GraduationProject.TripPlannerZ.domain.QMemberPreference.memberPreference;

public class MemberPreferenceRepositoryImpl implements MemberPreferenceCustom {

    private final JPAQueryFactory queryFactory;

    public MemberPreferenceRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<MemberPreference> findMemberTypes(Member loginMember) {
        List<MemberPreference> result = queryFactory.selectFrom(memberPreference)
                .join(memberPreference.member, member)
                .where(member.email.eq(loginMember.getEmail()))
                .fetch();

        return result;
    }
}
