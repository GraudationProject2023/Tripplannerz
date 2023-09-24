package GraduationProject.TripPlannerZ.dto.member;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MemberTrip {

//    @Value("${spring.servlet.multipart.location}")
//    private String path;

    private Long id;
    private String UUID;
    private String title;
    private String startingDate;
    private String comingDate;
    private String imagePath;
    private int recruitNum;
    private int currentNum;

    @QueryProjection
    public MemberTrip(Long id, String UUID, String title, String startingDate, String comingDate, String imageUUID,
                      int currentNum, int recruitNum) {
        this.id = id;
        this.UUID = UUID;
        this.title = title;
        this.startingDate = startingDate;
        this.comingDate = comingDate;
        this.imagePath = "/Users/seongbochoi/trip_image/" + imageUUID + ".png";
        this.recruitNum = recruitNum;
        this.currentNum = currentNum;

    }
}
