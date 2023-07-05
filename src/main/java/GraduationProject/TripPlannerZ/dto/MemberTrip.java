package GraduationProject.TripPlannerZ.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

@Data
@NoArgsConstructor
public class MemberTrip {

    @Value("${spring.servlet.multipart.location}")
    private String path;

    private String UUID;
    private String title;
    private String startingDate;
    private String comingDate;
    private String imagePath;

    @QueryProjection
    public MemberTrip(String UUID, String title, String startingDate, String comingDate, String imageUUID) {
        this.UUID = UUID;
        this.title = title;
        this.startingDate = startingDate;
        this.comingDate = comingDate;
        this.imagePath = path + "\\" + imageUUID + ".png";

    }
}
