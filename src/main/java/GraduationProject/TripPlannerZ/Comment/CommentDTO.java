package GraduationProject.TripPlannerZ.Comment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO {

    private String memberEmail;
    private String tripUUID;
    private String comment;
}
