package GraduationProject.TripPlannerZ.Comment;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final Map<String, List<SseEmitter>> emittersByTrip = new HashMap<>();

    /**
     * SSEEmitter를 등록합니다. 각 여행 일정(tripId)에 대한 SSEEmitterManager를 생성하거나 가져옵니다.
     *
     * @param tripUUID  여행 일정 ID
     * @param emitter SSEEmitter 객체
     */
    public void addEmitter(String tripUUID, SseEmitter emitter) {
        emittersByTrip.computeIfAbsent(tripUUID, k -> new ArrayList<>()).add(emitter);
    }

    /**
     * SSEEmitter를 제거합니다.
     *
     * @param tripUUID  여행 일정 ID
     * @param emitter SSEEmitter 객체
     */
    public void removeEmitter(String tripUUID, SseEmitter emitter) {
        emittersByTrip.getOrDefault(tripUUID, Collections.emptyList()).remove(emitter);
    }

    /**
     * 여행 일정의 구독자에게 새로운 댓글을 알림으로 보냅니다.
     *
     * @param tripUUID  여행 일정 ID
     * @param comment 추가된 댓글
     */
    public void notifySubscribers(String tripUUID, String comment) {
        List<SseEmitter> emitters = emittersByTrip.getOrDefault(tripUUID, Collections.emptyList());

        emitters.forEach(emitter -> {
            try {
                emitter.send(SseEmitter.event().data(comment));
            } catch (IOException e) {
                emitter.complete();
            }
        });
    }

    // 댓글 추가 로직 (가정)
    // 실제로는 데이터베이스에 댓글을 저장하거나 다른 비즈니스 로직을 수행합니다.
    public void addComment(String tripUUID, String comment, String username) {

        // 여행 일정에 댓글을 추가하는 로직

        // 알림 보내기
        String message = username + "님이 댓글을 남겼습니다: " + comment;
        notifySubscribers(tripUUID, message);
    }
}
