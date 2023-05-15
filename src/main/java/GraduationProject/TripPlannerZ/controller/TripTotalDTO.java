package GraduationProject.TripPlannerZ.controller;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TripTotalDTO {

    private List<MemberTripDTO> result;
    private long total;
}
