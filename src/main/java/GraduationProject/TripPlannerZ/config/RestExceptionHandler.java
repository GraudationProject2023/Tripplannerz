package GraduationProject.TripPlannerZ.config;

import GraduationProject.TripPlannerZ.config.dto.ErrorDto;
import GraduationProject.TripPlannerZ.config.exceptions.AppException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class RestExceptionHandler {

    /**
     *  모든 컨트롤러에 적용, Appexception 발생시 실행됨
     */
    @ExceptionHandler(value = {AppException.class})
    @ResponseBody
    public ResponseEntity<ErrorDto> handeException(AppException ex) {
        return ResponseEntity.status(ex.getCode())
                .body(ErrorDto.builder().message(ex.getMessage()).build());
    }
}
