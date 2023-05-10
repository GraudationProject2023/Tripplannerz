package GraduationProject.TripPlannerZ.controller;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TripCreateDTO {

    private String title;
    private String startingDate;
    private String content;
    private String period;
}
