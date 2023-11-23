package GraduationProject.TripPlannerZ.controller;

import GraduationProject.TripPlannerZ.domain.Location;
import GraduationProject.TripPlannerZ.domain.Trip;
import GraduationProject.TripPlannerZ.dto.LocationOrder;
import GraduationProject.TripPlannerZ.dto.LocationSave;
import GraduationProject.TripPlannerZ.dto.trip.LocationOptimize;
import GraduationProject.TripPlannerZ.service.LocationService;
import GraduationProject.TripPlannerZ.service.TripService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class LocationController {

    private final LocationService locationService;
    private final TripService tripService;

    @PostMapping("/optimizeRoute")
    public void optimizeRoute(@RequestBody LocationOptimize locationOptimize) {

        locationService.optimizeOrder(locationOptimize);

    }

    @GetMapping("/getRoute")
    public ArrayList<LocationOrder> getRoute(@RequestParam("tripUUID") String tripUUID) {
        return locationService.getLocationInOrder(tripUUID);

    }

    @PostMapping("/saveLocation")
    public void saveLoc(@RequestBody LocationSave locationSave) {

        Trip trip = tripService.findByUUID(locationSave.getTripUUID()).get();
        Location loc = Location.builder()
                .name(locationSave.getName())
                .x(locationSave.getX())
                .y(locationSave.getY())
                .trip(trip)
                .build();

        locationService.saveLocation(loc);

    }


}
