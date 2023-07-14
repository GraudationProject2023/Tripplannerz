package GraduationProject.TripPlannerZ.API;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class Body {

    private Items items;
    private int numOfRows;
    private int pageNo;
    private int totalCount;
}
