package GraduationProject.TripPlannerZ.controller;

import GraduationProject.TripPlannerZ.domain.Gender;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberJoinDTO {

    private String name;
    private String pw;
    private String email;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private String phoneNumber;
}