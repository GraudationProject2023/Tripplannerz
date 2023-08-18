package GraduationProject.TripPlannerZ.Comment;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController // JSON 형태로 데이터를 반환하는 것
@RequiredArgsConstructor
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"}, allowCredentials = "true")
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/add_comment")
    public ResponseEntity<String> addComment(
            @RequestParam String tripUUID,
            @RequestBody String comment,
            @RequestParam String username
    ) {
        // 댓글 추가 로직
        commentService.addComment(tripUUID, comment, username);

        return ResponseEntity.ok("댓글이 추가되었습니다.");
    }

    @GetMapping("/subscribe/{tripUUID}")
    public SseEmitter subscribeToComments(@PathVariable String tripUUID) {

        SseEmitter emitter = new SseEmitter();
        commentService.addEmitter(tripUUID, emitter);
        emitter.onCompletion(() -> commentService.removeEmitter(tripUUID, emitter));
        return emitter;
    }
}
