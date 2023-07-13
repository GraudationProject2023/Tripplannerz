package GraduationProject.TripPlannerZ.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.*;

@Data
@NoArgsConstructor
@ToString
public class Location {

    private String title;
    private String addr1;
    private Integer contenttypeid;



}
