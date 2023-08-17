package GraduationProject.TripPlannerZ.Comment;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Comment {

    @Id
    @GeneratedValue
    @Column(name = "comment_id")
    private Long id;

    //sender
    private String memberEmail;

    private String tripUUID;
    private String comment;
}
