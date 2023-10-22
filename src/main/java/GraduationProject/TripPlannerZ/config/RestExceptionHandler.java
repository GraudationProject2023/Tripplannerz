package GraduationProject.TripPlannerZ.config;

import GraduationProject.TripPlannerZ.exceptions.Error;
import GraduationProject.TripPlannerZ.exceptions.AppException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class RestExceptionHandler {

    /**
     *  모든 컨트롤러에 적용, Appexception 발생시 실행됨..
     */
    @ExceptionHandler(value = {AppException.class})
    @ResponseBody
    public ResponseEntity<Error> handeException(AppException ex) {
        return ResponseEntity.status(ex.getCode())
                .body(Error.builder().message(ex.getMessage()).build());
    }
}
