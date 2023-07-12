package GraduationProject.TripPlannerZ.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Location {

    String title;
    String addr1;
    Integer contenttypeid;



}
