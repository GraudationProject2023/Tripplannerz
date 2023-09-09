package GraduationProject.TripPlannerZ.comment;

import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TripComment {

    private Long senderId;
    private String content;
    private String postDate;

    @QueryProjection
    public TripComment(Long senderId, String content, String postDate) {
        this.senderId = senderId;
        this.content = content;
        this.postDate = postDate;
    }
}
