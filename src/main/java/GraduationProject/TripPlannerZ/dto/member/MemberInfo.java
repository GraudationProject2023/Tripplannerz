package GraduationProject.TripPlannerZ.dto.member;

import GraduationProject.TripPlannerZ.domain.Gender;
import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@NoArgsConstructor

public class MemberInfo {

    private String email;
    private String name;
    private Gender gender;

    @QueryProjection
    public MemberInfo(String email, String name, Gender gender) {
        this.email = email;
        this.name = name;
        this.gender = gender;
    }
}
