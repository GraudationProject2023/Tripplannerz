package GraduationProject.TripPlannerZ.service;

import GraduationProject.TripPlannerZ.API.ApiResponse;
import GraduationProject.TripPlannerZ.API.Item;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AreaService {

    private final WebClient webClient = WebClient.create("https://apis.data.go.kr/B551011/KorService1");
    private final String serviceKey = "4B0yGfBS//YHcP9p7Xwt0DFfKDm2NIT2kq9Qnt/tCsEQ01PFyIxoyCFMUNx99M0IY38tKItC8on5gEETaNEJ8A==";

    public List<Item> locationListByArea(String areaCode, String sigunguCode) {

        ApiResponse apiResponse = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/areaBasedList1")
                        .queryParam("serviceKey", serviceKey)
                        .queryParam("numOfRows", 10)
                        .queryParam("pageNo", 1)
                        .queryParam("MobileOS", "ETC")
                        .queryParam("MobileApp", "TripPlannerZ")
                        .queryParam("_type", "json")
                        .queryParam("areaCode", areaCode)
                        .queryParam("sigunguCode", sigunguCode)
                        .build())
                .retrieve()
                .bodyToMono(ApiResponse.class)
                .block();

        // .getResponse()가 null일 경우 예외처리 추가해 줘야됨
        List<Item> items = apiResponse.getResponse().getBody().getItems().getItem();


        return items;
    }
}
