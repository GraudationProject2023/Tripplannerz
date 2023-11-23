package GraduationProject.TripPlannerZ.API.naver;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShortestTimeRouteReq {

    private String start;
    private String goal;
    private String option;

    public MultiValueMap<String, String> toMultiValueMap() {
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();

        map.add("start", start);
        map.add("goal", goal);
        map.add("option", option);

        return map;

    }

}
