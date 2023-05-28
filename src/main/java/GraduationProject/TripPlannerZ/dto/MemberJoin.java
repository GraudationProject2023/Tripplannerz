package GraduationProject.TripPlannerZ.dto;

import GraduationProject.TripPlannerZ.domain.Gender;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberJoin {

    private String name;
    private String pw;
    private String email;
    @Enumerated(EnumType.STRING)
    private Gender gender;

    private String types;
}