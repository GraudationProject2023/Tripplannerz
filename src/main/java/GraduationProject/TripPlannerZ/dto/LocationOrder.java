package GraduationProject.TripPlannerZ.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LocationOrder implements Comparable<LocationOrder> {

    private String name;
    private long orders;

    @Override
    public int compareTo(LocationOrder o) {
        if (this.orders < o.orders) return -1;
        else if (this.orders == o.orders) return 0;
        else return 1;
    }

}
