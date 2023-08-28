package GraduationProject.TripPlannerZ.cityNum;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Area {

    @Id
    @Column(name = "area_code")
    private int code;

    private String name;

    @OneToMany(mappedBy = "area")
    private List<Sigungu> sigunguList = new ArrayList<>();

    @Builder
    public Area(int code, String name, List<Sigungu> sigunguList) {
        this.code = code;
        this.name = name;
        this.sigunguList = sigunguList;
    }
}
