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
    private final String serviceKey = "5Lz73gDroM5Kmib%2Bptu35PIQCl%2BRjgpLKfesBUQEdFYYoNawvaUw5Q9Y71%2FzSZUIbjAE0PMv4gP3tTrPjWyMwg%3D%3D";

    public List<Location> locationListByArea(String areaCode, String sigunguCode) {

        List<Location> locationList = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path(String.format("/areaBasedList1"))
                        .queryParam("serviceKey", serviceKey)
//                        .queryParam("numOfRows", 10)
//                        .queryParam("pageNo", 1)
                        .queryParam("MobileOS", "ETC")
                        .queryParam("MobileApp", "TripPlannerZ")
                        .queryParam("_type", "json")
                        .queryParam("areaCode", areaCode)
                        .queryParam("sigunguCode", sigunguCode)
                        .build())
                .retrieve()
                .bodyToFlux(Location.class)
                .collectList()
                .block();

        return locationList;
    }
}
