package GraduationProject.TripPlannerZ.API.naver;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ShortestTimeRouteRes {

    private double[] start;
    private double[] goal;
    private long distance;
    private long duration;

    public ShortestTimeRouteRes(double[] start, double[] goal, long distance, long duration) {
        this.start = start;
        this.goal = goal;
        this.distance = distance;
        this.duration = duration;
    }
}
