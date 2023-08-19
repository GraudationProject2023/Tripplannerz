package GraduationProject.TripPlannerZ.Comment;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;

    public Long saveComment(Comment comment) {

        return commentRepository.save(comment).getId();

    }


}
