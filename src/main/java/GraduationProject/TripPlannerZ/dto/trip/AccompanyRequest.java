package GraduationProject.TripPlannerZ.dto.trip;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AccompanyRequest {
    Long comment_id;
    String tripName;
    String senderName;
    String tripUUID;
    String comment;

    @QueryProjection
    public AccompanyRequest(Long comment_id, String tripName, String senderName, String tripUUID, String comment) {
        this.comment_id = comment_id;
        this.tripName = tripName;
        this.senderName = senderName;
        this.tripUUID = tripUUID;
        this.comment = comment;
    }
}
