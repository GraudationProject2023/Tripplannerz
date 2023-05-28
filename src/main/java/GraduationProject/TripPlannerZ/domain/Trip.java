package GraduationProject.TripPlannerZ.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Trip {

    @Id
    @GeneratedValue
    @Column(name = "trip_id")
    private Long id;
    private String UUID;
    private String title;

    private String image_uuid;
    private Long recruitNum;
    private String closeRecruitDate;
    private String startingDate;
    private String comingDate;
    private String content;

    @OneToOne(mappedBy = "trip", fetch = FetchType.LAZY)
    private Party group;

    //private Chat chat;

    @Builder
    public Trip(String title, String image_uuid, Long recruitNum,
                String closeRecruitDate, String content,
                String startingDate, String comingDate, Party group) {
        this.UUID = java.util.UUID.randomUUID().toString();
        this.title = title;
        this.recruitNum = recruitNum;
        this.closeRecruitDate = closeRecruitDate;
        this.startingDate = startingDate;
        this.comingDate = comingDate;
        this.group = group;
        this.content = content;
        this.image_uuid = image_uuid;
    }
}
