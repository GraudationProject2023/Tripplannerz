package GraduationProject.TripPlannerZ.controller;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberTripTotalDTO {

    private List<MemberTripTitleDTO> result;
    private long total;
}
