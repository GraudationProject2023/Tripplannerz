package GraduationProject.TripPlannerZ.Alarm;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;

public interface EmitterRepository {


    /*
    SseEmitter를 이용해 알림을 실제로 보내게 되는데
    어떤 회원에게 어떤 Emitter가 연결되어있는지를 저장해줘야하고
    어떤 이벤트들이 현재까지 발생했는지에 대해서도 저장하고 있어야 한다.
    */

    // Emitter를 저장한다.
    SseEmitter save(String emitterId, SseEmitter sseEmitter);

    // 이벤트를 저장한다.
    void saveEventCache(String emitterId, Object event);

    // 해당 회원과 관련된 모든 Emitter를 찾는다.
    // 브라우저당 여러 개 연결이 가능하기에 여러 Emitter가 존재할 수 있다.
    Map<String, SseEmitter> findAllEmitterStartWithByMemberId(Long memberId);

    // 해당 회원과 관련된 모든 이벤트를 찾는다.
    Map<String, Object> findAllEventCacheStartWithByMemberId(Long memberId);

    // Emitter를 지운다.
    void deleteById(Long id);

    // 해당 회원과 관련된 모든 Emitter를 지운다.
    void deleteAllEmitterStartWithId(Long memberId);

    // 해당 회원과 관련된 모든 이벤트를 지운다.
    void deleteAllEventCacheStartWithId(Long memberId);
}
