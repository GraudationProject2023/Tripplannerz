package GraduationProject.TripPlannerZ.comment;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;

    public Long saveComment(Comment comment) {

        return commentRepository.save(comment).getId();

    }

    public List<TripComment> getCommentList(String tripUUID) {

        return commentRepository.tripCommentsList(tripUUID);

    }

    public Comment getCommentById(Long id) {
        return commentRepository.findById(id).get();
    }

    public void delete(Long id) {
        commentRepository.delete(commentRepository.findById(id).get());
    }
}
