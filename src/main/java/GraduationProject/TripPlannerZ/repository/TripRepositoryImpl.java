package GraduationProject.TripPlannerZ.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;

import static GraduationProject.TripPlannerZ.domain.QTrip.trip;

public class TripRepositoryImpl implements TripRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public TripRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public void updateHits(Long id) {
        queryFactory.update(trip)
                .set(trip.hits, trip.hits.add(1))
                .where(trip.id.eq(id))
                .execute();
    }
}
