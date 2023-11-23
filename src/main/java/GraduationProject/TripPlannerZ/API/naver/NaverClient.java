package GraduationProject.TripPlannerZ.API.naver;


import GraduationProject.TripPlannerZ.API.naver.ShortestTimeRouteRes;
import GraduationProject.TripPlannerZ.API.naver.response.RouteResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Map;

@Component
public class NaverClient {

    @Value("${naver.client.id}")
    private String naverClientId;

    @Value("${naver.client.secret}")
    private String naverSecret;

    @Value("${naver.url.map-direction.v1.driving}")
    private String naverAPIUrl;

    public ShortestTimeRouteRes searchShortestTimeRoute(ShortestTimeRouteReq str) {

        var uri = UriComponentsBuilder
                .fromUriString(naverAPIUrl)
                .queryParams(str.toMultiValueMap())
                .build()
                .toUri();

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-NCP-APIGW-API-KEY-ID", naverClientId);
        headers.set("X-NCP-APIGW-API-KEY", naverSecret);
        headers.setContentType(MediaType.APPLICATION_JSON);

        var httpEntity = new HttpEntity<>(headers);
//        var responseType = new ParameterizedTypeReference<ShortestTimeRouteRes>() {};

        var responseEntity = new RestTemplate()
                .exchange(
                        uri,
                        HttpMethod.GET,
                        httpEntity,
                        RouteResponse.class
                );

        double[] start = responseEntity.getBody().getRoute().getTrafast()[0].getSummary().getStart().getLocation();
        double[] goal = responseEntity.getBody().getRoute().getTrafast()[0].getSummary().getGoal().getLocation();
        long distance = responseEntity.getBody().getRoute().getTrafast()[0].getSummary().getDistance();
        long duration = responseEntity.getBody().getRoute().getTrafast()[0].getSummary().getDuration();

        return new ShortestTimeRouteRes(start, goal, distance, duration);

    }

}

