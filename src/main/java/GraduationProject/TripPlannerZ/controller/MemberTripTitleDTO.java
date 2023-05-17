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

    public MemberTripTitleDTO(Trip trip) {
        this.id = trip.getUUID();
        title = trip.getTitle();
    }
}
