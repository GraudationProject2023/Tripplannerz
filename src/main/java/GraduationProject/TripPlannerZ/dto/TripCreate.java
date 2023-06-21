package GraduationProject.TripPlannerZ.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TripCreate {

    private String UUID;
    private String title;
    private int recruitNum;
    private String closeRecruitDate;
    private String startingDate;
    private String comingDate;
    private String areaName;
    private String sigunguName;
}
