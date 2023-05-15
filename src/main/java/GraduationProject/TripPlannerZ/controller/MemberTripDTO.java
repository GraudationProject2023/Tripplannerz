package GraduationProject.TripPlannerZ.controller;

import GraduationProject.TripPlannerZ.domain.Trip;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberTripDTO {

    private String id;
    private String title;
    private String period;
    private String content;
    private String startingDate;

    public MemberTripDTO(Trip trip) {
        this.id = UUID.randomUUID().toString();
        title = trip.getTitle();
        period = trip.getPeriod();
        content = trip.getContent();
        startingDate = trip.getStartingDate();
    }
}
