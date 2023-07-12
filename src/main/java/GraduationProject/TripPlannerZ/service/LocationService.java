package GraduationProject.TripPlannerZ.service;

import GraduationProject.TripPlannerZ.dto.Location;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LocationService {

    private final WebClient webClient;
    private final String serviceKey = "PAk9KmJ3JcFmrYQmS10OsslzJLFqq%2BGA8AmmTUlinPvUNEkQ9Elvo0IbTmgMrJzlOf5TgZvcK8InREeJ3%2BW9Mg%3D%3D";

    public List<Location> locationListByArea(int areaCode, int sigunguCode) {

        List<Location> locationList = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path(String.format("/areaBasedList1"))
                        .queryParam("serviceKey", serviceKey)
                        .queryParam("numOfRows", 10)
                        .queryParam("pageNo", 1)
                        .queryParam("MobileOS", "ETC")
                        .queryParam("MobileApp", "TripPlannerZ")
                        .queryParam("_type", "json")
                        .queryParam("areaCode", areaCode)
                        .queryParam("sigunguCode", sigunguCode)
                        .build())
                .header("accept", "application/json")
                .retrieve()
                .bodyToFlux(Location.class)
                .collectList()
                .block();

        return locationList;

    }


}
