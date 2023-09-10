package GraduationProject.TripPlannerZ.comment;

import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TripComment {

    private String senderName;
    private String review;
    private String postDate;

    @QueryProjection
    public TripComment(String senderName, String review, String postDate) {
        this.senderName = senderName;
        this.review = review;
        this.postDate = postDate;
    }
}
