package GraduationProject.TripPlannerZ.dto;

import lombok.Data;

@Data
public class LocationSave {

    private String name;
    private double x;
    private double y;
    private String tripUUID;
}
