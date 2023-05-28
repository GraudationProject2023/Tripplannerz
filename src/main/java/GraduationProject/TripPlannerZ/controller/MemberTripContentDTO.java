package GraduationProject.TripPlannerZ.controller;

import GraduationProject.TripPlannerZ.domain.Trip;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberTripContentDTO {

    private String content;
    private String startingDate;

    public MemberTripContentDTO(Trip trip) {
        content = trip.getContent();
        startingDate = trip.getStartingDate();
    }
}
