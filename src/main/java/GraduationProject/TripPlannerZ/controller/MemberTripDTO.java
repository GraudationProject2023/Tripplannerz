package GraduationProject.TripPlannerZ.controller;

import GraduationProject.TripPlannerZ.domain.Trip;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberTripDTO {

    private String title;
    private String period;
    private String content;
    private String startingDate;

    public MemberTripDTO(Trip trip) {
        title = trip.getTitle();
        period = trip.getPeriod();
        content = trip.getContent();
        startingDate = trip.getStartingDate();
    }
}
