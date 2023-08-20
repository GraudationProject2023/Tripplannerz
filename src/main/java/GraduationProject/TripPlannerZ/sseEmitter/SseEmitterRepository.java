package GraduationProject.TripPlannerZ.sseEmitter;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Collections;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class SseEmitterRepository {

    private final Map<Long, SseEmitter> emitters = new ConcurrentHashMap<>();
    private final Map<String, Object> eventCache = new ConcurrentHashMap<>();
    private final Map<Long, String> lastEventIdCache = new ConcurrentHashMap<>();

    public SseEmitter addEmitter(Long memberId, SseEmitter sseEmitter) {
        emitters.put(memberId, sseEmitter);
        return sseEmitter;
    }

    public void deleteById(Long id) {
        emitters.remove(id);
    }

    public SseEmitter findEmitterByMemberId(Long memberID) {
        return emitters.get(memberID);
    }

    public boolean containsEmittersByMemberId(Long memberId) {
        if (emitters.containsKey(memberId)) return true;
        else return false;
    }

    public void saveEventCache(String eventId, Object event) {
        eventCache.put(eventId, event);
    }

    public Map<String, Object> findAllEventCacheStartWithByMemberId(Long memberId) {
        return eventCache.entrySet().stream()
                .filter(entry -> entry.getKey().startsWith(String.valueOf(memberId)))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

    public void saveLastEventId(Long memberId) {
        Map<String, Object> eventCacheList = findAllEventCacheStartWithByMemberId(memberId);
        String lastEventId = Collections.max(eventCacheList.keySet());
        lastEventIdCache.put(memberId, lastEventId);
    }

    public String findLastEventIdByMemberId(Long memberId) {
        return lastEventIdCache.get(memberId);
    }

}
