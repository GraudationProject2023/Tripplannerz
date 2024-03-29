package GraduationProject.TripPlannerZ.dto.trip;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TripCreate {

    private String UUID;
    private String title;
    private int capacity;
    private String closeRecruitDate;
    private String goingDate;
    private String comingDate;
    private String area;
    private String sigungu;
//    private MultipartFile uploadFile;
}
