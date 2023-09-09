package GraduationProject.TripPlannerZ.sseEmitter;


import GraduationProject.TripPlannerZ.comment.Comment;
import GraduationProject.TripPlannerZ.comment.Notification;
import GraduationProject.TripPlannerZ.domain.Member;
import GraduationProject.TripPlannerZ.domain.MemberParty;
import GraduationProject.TripPlannerZ.service.MemberService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SseEmitterService {

    private final SseEmitterRepository sseEmitterRepository;
    private final MemberService memberService;
    private static ObjectMapper om = new ObjectMapper();


    public SseEmitter subscribe(Long memberId) {

        SseEmitter sseEmitter = sseEmitterRepository.addEmitter(memberId, new SseEmitter(3_600_000L));

        sseEmitter.onCompletion(() -> {
            sseEmitterRepository.saveLastEventId(memberId);
            sseEmitterRepository.deleteById(memberId);
        });
        sseEmitter.onTimeout(() -> {
            sseEmitterRepository.saveLastEventId(memberId);
            sseEmitterRepository.deleteById(memberId);
        });
        sseEmitter.onError((e) -> {
            sseEmitterRepository.saveLastEventId(memberId);
            sseEmitterRepository.deleteById(memberId);
        });

        sendEvent(sseEmitter, memberId, "EventStream Created. [userId=" + memberId + "]");

        System.out.println("sseEmitter = " + sseEmitter);

        String lastEventId = sseEmitterRepository.findLastEventIdByMemberId(memberId);

        System.out.println("lastEventId = " + lastEventId);

        if (lastEventId != null) {
            Map<String, Object> events = sseEmitterRepository.findAllEventCacheStartWithByMemberId(memberId);
            events.entrySet().stream()
                    .filter(entry -> lastEventId.compareTo(entry.getKey()) < 0)
                    .forEach(entry -> sendEvent(sseEmitter, Long.valueOf(entry.getKey()), entry.getValue()));
        }

        return sseEmitter;

    }

    /**
     *  사용자에게 실시간 알림 전송 및 연결되어 있지 않은 구독자를 위해 eventCache에 event저장
     */
    public void sendNotification(Long memberId, Object data) {

        String eventId = memberId + "_" + System.currentTimeMillis();

        SseEmitter emitterByMemberId = sseEmitterRepository.findEmitterByMemberId(memberId);
        sseEmitterRepository.saveEventCache(eventId, data);
        sendEvent(emitterByMemberId, memberId, data);

    }

    /**
     *  해당 사용자에게 SseEmitter event 전송
     */
    public void sendEvent(SseEmitter sseEmitter, Long memberId, Object data) {

        String eventId = memberId + "_" + System.currentTimeMillis();

        try {
            sseEmitter.send(SseEmitter.event()
                    .id(eventId)
                    .name("SSE")
                    .data(om.writeValueAsString(data)));
        } catch (IOException e) {
            sseEmitterRepository.deleteById(memberId);
            throw new RuntimeException(e);
        }

    }

    public void sendNotificationToMembersInParty(List<MemberParty> receiver, Comment comment) {

        for (MemberParty receivedMember : receiver) {
            Member m = receivedMember.getMember();

            // 알림 저장 및 알림 전송
            Notification notification = Notification.builder()
                    .comment(comment)
                    .member(m)
                    .build();

//            notificationService.saveNotification(notification);
            Long id = m.getId();

            if (sseEmitterRepository.containsEmittersByMemberId(id)) {
                sendNotification(id, notification);
            }
        }

    }



}
