package GraduationProject.TripPlannerZ.dto;

import GraduationProject.TripPlannerZ.domain.MemberPreference;
import GraduationProject.TripPlannerZ.domain.Rank;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;

@Data
public class Preference {
    private int type;
    @Enumerated(EnumType.STRING)
    private Rank rank;

    public Preference(MemberPreference mp) {
        this.type = mp.getType();
        this.rank = mp.getRank();
    }
}
