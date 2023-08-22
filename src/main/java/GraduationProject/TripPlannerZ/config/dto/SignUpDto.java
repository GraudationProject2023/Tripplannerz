package GraduationProject.TripPlannerZ.config.dto;

import GraduationProject.TripPlannerZ.domain.Gender;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class SignUpDto {

    private String name;
    private char[] pw;
    private String email;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private String type;
}
