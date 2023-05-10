package GraduationProject.TripPlannerZ.service;

import GraduationProject.TripPlannerZ.domain.Trip;
import GraduationProject.TripPlannerZ.repository.TripRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TripService {
    private final TripRepository tripRepository;

    public Long createTrip(Trip trip){
        tripRepository.save(trip);
        return trip.getId();
    }
}
