package GraduationProject.TripPlannerZ.config.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class CredentialDto {

    private String email;
    private char[] pw;
}
