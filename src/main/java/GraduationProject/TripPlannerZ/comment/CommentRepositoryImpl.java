package GraduationProject.TripPlannerZ.comment;


import GraduationProject.TripPlannerZ.domain.QTrip;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;

import java.util.List;

import static GraduationProject.TripPlannerZ.comment.QComment.comment;
import static GraduationProject.TripPlannerZ.domain.QTrip.trip;


public class CommentRepositoryImpl implements CommentRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public CommentRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<TripComment> tripCommentsList(String tripUUID) {

        List<TripComment> commentList = queryFactory.select(new QTripComment(
                        comment.sender.id,
                        comment.content,
                        comment.postDate

                ))
                .from(comment).where(comment.trip.eq(
                        JPAExpressions
                                .selectFrom(trip)
                                .where(trip.UUID.eq(tripUUID))
                ))
                .fetch();

        return commentList;
    }
}
