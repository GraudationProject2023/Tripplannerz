package GraduationProject.TripPlannerZ.API.naver.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Summary {

    private Start start;
    private Goal goal;
    private long distance;
    private long duration;
    private long tollFare;
    private long taxiFare;
    private long fuelPrice;

}
