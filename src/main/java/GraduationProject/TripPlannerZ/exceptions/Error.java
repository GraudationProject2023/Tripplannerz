package GraduationProject.TripPlannerZ.exceptions;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Builder
@Data
public class Error {

    private String message;

}
