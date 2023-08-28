package GraduationProject.TripPlannerZ.dto.member;

import GraduationProject.TripPlannerZ.domain.Gender;
import GraduationProject.TripPlannerZ.domain.Member;
import GraduationProject.TripPlannerZ.dto.Preference;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class MyPage {
    private String email;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private String name;
    private List<Preference> preferences;


    public MyPage(Member member) {
        this.email = member.getEmail();
        this.gender = member.getGender();
        this.name = member.getName();

        this.preferences = member.getTypes().stream()
                .map(p -> new Preference(p))
                .collect(Collectors.toList());
    }
}
