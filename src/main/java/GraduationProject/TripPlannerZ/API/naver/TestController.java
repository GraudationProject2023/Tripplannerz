package GraduationProject.TripPlannerZ.API.naver;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class TestController {

    private final NaverClient nc;

    @GetMapping("/testAPI")
    public void test() {
        ShortestTimeRouteReq req = new ShortestTimeRouteReq("127.1058342,37.359708", "129.075986,35.179470", "trafast");

        ShortestTimeRouteRes shortestTimeRouteRes = nc.searchShortestTimeRoute(req);
    }

}
