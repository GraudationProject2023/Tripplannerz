package GraduationProject.TripPlannerZ.dto;

import GraduationProject.TripPlannerZ.domain.MemberPreference;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class ModifyMemberInfo {

    private String pw;
    private List<MemberPreference> types = new ArrayList<>();
}
