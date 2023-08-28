package GraduationProject.TripPlannerZ.dto.member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class MemberDto {

    private Long id;
    private String name;
    private String email;
    private String token;



}
