package GraduationProject.TripPlannerZ.cityNum;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Sigungu {

    @Id
    @GeneratedValue
    private Long id;

    private int code;

    private String name;

    @ManyToOne
    @JoinColumn(name = "area_code")
    private Area area;

    @Builder
    public Sigungu(int code, String name, Area area) {
        this.code = code;
        this.name = name;
        this.setArea(area);
    }

    // == 연관관계 편의 메서드 == //
    public void setArea(Area area) {
        this.area = area;
        area.getSigunguList().add(this);
    }
}
