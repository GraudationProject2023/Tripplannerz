package GraduationProject.TripPlannerZ.controller;

import GraduationProject.TripPlannerZ.domain.Trip;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberTripTitleDTO {

    private String id;
    private String title;
    private String startingDate;
    private String period;

    public MemberTripTitleDTO(Trip trip) {
        this.id = trip.getUUID();
        this.title = trip.getTitle();
        this.startingDate = trip.getStartingDate();
        this.period = trip.getPeriod();
    }
}
