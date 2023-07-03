package GraduationProject.TripPlannerZ.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MemberTrip {

    private String UUID;
    private String title;
    private String startingDate;
    private String comingDate;

    @QueryProjection
    public MemberTrip(String UUID, String title, String startingDate, String comingDate) {
        this.UUID = UUID;
        this.title = title;
        this.startingDate = startingDate;
        this.comingDate = comingDate;
    }
}
