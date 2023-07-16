package GraduationProject.TripPlannerZ.dto;

import GraduationProject.TripPlannerZ.domain.Member;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class TripDetail {

    private Long id;
    private String UUID;
    private String title;
    private String startingDate;
    private String comingDate;
    private String imagePath;
    private String content;
    private int memberNum;
    private List<Member> memberList = new ArrayList<>();




}
