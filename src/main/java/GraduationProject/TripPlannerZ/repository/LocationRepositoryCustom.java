package GraduationProject.TripPlannerZ.repository;

import GraduationProject.TripPlannerZ.domain.Location;
import GraduationProject.TripPlannerZ.domain.Trip;
import GraduationProject.TripPlannerZ.dto.LocationOrder;

import java.util.ArrayList;
import java.util.List;

public interface LocationRepositoryCustom {

    Location findStartNodeByTrip(Trip trip);
    ArrayList<Location> findFalseNodeByTrip(Trip trip);
    Location findNodeByNameInTrip(Trip trip, String name);

    ArrayList<LocationOrder> findByTrip(Trip trip);


}
