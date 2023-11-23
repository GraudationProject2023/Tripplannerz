package GraduationProject.TripPlannerZ.API.naver;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class NaverClientTest {

    @Autowired
    private NaverClient nc;

    @Test
    public void search() {
        ShortestTimeRouteReq req = new ShortestTimeRouteReq("127.1058342,37.359708", "129.075986,35.179470", "trafast");

        ShortestTimeRouteRes shortestTimeRouteRes = nc.searchShortestTimeRoute(req);
        System.out.println("start : " + shortestTimeRouteRes.getStart()[0] + ", " + shortestTimeRouteRes.getStart()[1]);
        System.out.println("goal : " + shortestTimeRouteRes.getGoal()[0] + ", " + shortestTimeRouteRes.getGoal()[1]);
        System.out.println("distance : " + shortestTimeRouteRes.getDistance());
        System.out.println("duration : " + shortestTimeRouteRes.getDuration());
    }

}