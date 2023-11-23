package GraduationProject.TripPlannerZ.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LocationOrder implements Comparable<LocationOrder> {

    private String name;
    private double x;
    private double y;
    private long orders;

    @QueryProjection
    public LocationOrder(String name, double x, double y, long orders) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.orders = orders;
    }

    @Override
    public int compareTo(LocationOrder o) {
        if (this.orders < o.orders) return -1;
        else if (this.orders == o.orders) return 0;
        else return 1;
    }

}
