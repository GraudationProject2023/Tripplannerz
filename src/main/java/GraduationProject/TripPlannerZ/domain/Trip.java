package GraduationProject.TripPlannerZ.domain;

import GraduationProject.TripPlannerZ.comment.Comment;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    @OneToMany(mappedBy = "trip")
    private List<TripImage> tripImages = new ArrayList<>();
    private int recruitNum;
    private int currentNum;
    private String closeRecruitDate;
    private String startingDate;
    private String comingDate;
    private String content;
    private int areaCode;
    private int sigunguCode;

    @OneToMany(mappedBy = "trip", cascade = CascadeType.REMOVE)
    private List<Comment> comments = new ArrayList<>();

    @OneToOne(mappedBy = "trip", fetch = FetchType.LAZY)
    private Party party;

    private LocalDateTime creationTime;
    private Integer likes;
    private Integer hits;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member creater;

    @Builder
    public Trip(String title, List<TripImage> tripImage, int recruitNum, int currentNum,
                String closeRecruitDate, String content,
                String startingDate, String comingDate, Party party, int areaCode, int sigunguCode, List<Comment> comments,
                Member creater) {

        this.UUID = java.util.UUID.randomUUID().toString();
        this.title = title;
        this.recruitNum = recruitNum;
        this.currentNum = currentNum;
        this.closeRecruitDate = closeRecruitDate;
        this.startingDate = startingDate;
        this.comingDate = comingDate;
        this.content = content;
        this.tripImages = tripImage;
        this.areaCode = areaCode;
        this.sigunguCode = sigunguCode;
        this.comments = comments;

        likes = 0;
        hits = 0;
        creationTime = LocalDateTime.now();

        setParty(party);
        setCreater(creater);
    }

    // == 연관관계 편의 메서드 == //
    public void setParty(Party party) {
        this.party = party;
        party.setTrip(this);
    }

    public void setCreater(Member creater) {
        this.creater = creater;
        creater.getMadeTripList().add(this);
    }

    public void setCurrentNum(int currentNum) {
        this.currentNum = currentNum;
    }
}
