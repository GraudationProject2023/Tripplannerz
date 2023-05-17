package GraduationProject.TripPlannerZ.service;

import GraduationProject.TripPlannerZ.domain.Trip;
import GraduationProject.TripPlannerZ.repository.TripRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TripService {
    private final TripRepository tripRepository;

    @Transactional
    public Long createTrip(Trip trip){
        tripRepository.save(trip);
        return trip.getId();
    }

    public Optional<Trip> findByUUID(String id){
        return tripRepository.findByUUID(id);
    }
}
