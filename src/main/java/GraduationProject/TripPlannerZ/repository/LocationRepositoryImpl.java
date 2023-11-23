package GraduationProject.TripPlannerZ.repository;

import GraduationProject.TripPlannerZ.domain.Location;
import GraduationProject.TripPlannerZ.domain.Trip;
import GraduationProject.TripPlannerZ.dto.LocationOrder;
import GraduationProject.TripPlannerZ.dto.QLocationOrder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;

import java.util.ArrayList;
import java.util.List;

import static GraduationProject.TripPlannerZ.domain.QLocation.location;

public class LocationRepositoryImpl implements LocationRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public LocationRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Location findStartNodeByTrip(Trip trip) {
        Location start = queryFactory.selectFrom(location)
                .where(location.trip.eq(trip).and(location.start.eq(true)))
                .fetchOne();
        return start;
    }

    @Override
    public Location findNodeByNameInTrip(Trip trip, String name) {

        Location node = queryFactory.selectFrom(location)
                .where(location.trip.eq(trip).and(location.name.eq(name)))
                .fetchOne();
        return node;
    }

    @Override
    public ArrayList<Location> findFalseNodeByTrip(Trip trip) {
        ArrayList<Location> locList = (ArrayList<Location>) queryFactory.selectFrom(location)
                .where(location.trip.eq(trip).and(location.start.eq(false)))
                .fetch();

        return locList;
    }

    @Override
    public ArrayList<LocationOrder> findByTrip(Trip trip) {

        List<LocationOrder> list = queryFactory.select(new QLocationOrder(
                location.name,
                location.x,
                location.y,
                location.orders
        )).from(location).where(location.trip.eq(trip)).fetch();

        return (ArrayList<LocationOrder>) list;
    }
}
