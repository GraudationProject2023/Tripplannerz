package GraduationProject.TripPlannerZ.comment;

import java.util.List;

public interface CommentRepositoryCustom {

    List<TripComment> tripCommentsList(String tripUUID);

}
