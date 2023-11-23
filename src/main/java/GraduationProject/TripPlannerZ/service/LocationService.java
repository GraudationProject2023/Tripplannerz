package GraduationProject.TripPlannerZ.service;

import GraduationProject.TripPlannerZ.API.naver.NaverClient;
import GraduationProject.TripPlannerZ.API.naver.ShortestTimeRouteReq;
import GraduationProject.TripPlannerZ.API.naver.ShortestTimeRouteRes;
import GraduationProject.TripPlannerZ.domain.Location;
import GraduationProject.TripPlannerZ.domain.Trip;
import GraduationProject.TripPlannerZ.dto.LocationOrder;
import GraduationProject.TripPlannerZ.dto.trip.LocationOptimize;
import GraduationProject.TripPlannerZ.repository.LocationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;

@Service
@RequiredArgsConstructor
public class LocationService {

    private final LocationRepository locationRepository;
    private final TripService tripService;
    private final NaverClient nc;

    private static int n;
    private static long w[][], dp[][];
    private static int parent[][];
    private static long INF = Long.MAX_VALUE;
    private static long min;

    public void saveLocation(Location loc) {

        locationRepository.save(loc);

    }

    @Transactional
    public void optimizeOrder(LocationOptimize locationOptimize) {

        Trip trip = tripService.findByUUID(locationOptimize.getTripUUID()).get();
        Location prevStart = locationRepository.findStartNodeByTrip(trip);

        if (prevStart != null) {
            prevStart.setStart(false);
        }

        Location startNode = locationRepository.findNodeByNameInTrip(trip, locationOptimize.getName());
        startNode.setStart(true);

        ArrayList<Location> locationList = locationRepository.findFalseNodeByTrip(trip);
        locationList.add(0, startNode);

        if (locationList.size() > 1) {


            n = locationList.size();
            w = getCost(locationList);
            dp = new long[n][(1 << n) - 1];
            parent = new int[n][(1 << n) - 1];
            for (int i = 0; i < n; i++) Arrays.fill(dp[i], INF);
            min = tsp(0, 1);
            StringBuilder order = new StringBuilder("0,");
            printOrder(0, 1, order);
            String[] arr = order.toString().split(",");

            ArrayList<LocationOrder> al = new ArrayList<>();
            for (int i = 0; i < arr.length; i++) {
                Location tmp = locationList.get(Integer.parseInt(arr[i]));
                tmp.setOrders((long)i);
            }
            Collections.sort(al);

        } else {
            return;
        }



    }

    public long[][] getCost(ArrayList<Location> locArr) {

        long[][] cost = new long[locArr.size()][locArr.size()];


        for (int i = 0; i < cost.length; i++) {
            for (int j = 0; j < cost.length; j++) {
                if (i == j) cost[i][j] = 0;
                else {

                    StringBuilder sb = new StringBuilder();
                    sb.append(locArr.get(i).getX() + "," + locArr.get(i).getY());
                    String start = sb.toString();

                    sb.setLength(0);

                    sb.append(locArr.get(j).getX() + "," + locArr.get(j).getY());
                    String goal = sb.toString();

                    ShortestTimeRouteRes result = nc.searchShortestTimeRoute(new ShortestTimeRouteReq(start, goal, "trafast"));
                    cost[i][j] = result.getDuration();

                }


            }
        }

        return cost;

    }

    public long tsp(int node, int visit) {
//        System.out.println(visit);
        if (visit == (1 << n) - 1) {
            if (w[node][0] == 0) return INF;
            return w[node][0];
        }

        if (dp[node][visit] != INF) return dp[node][visit];

        for (int i = 0; i < n; i++) {
            int next = visit | (1 << i);
            if (w[node][i] == 0 || (visit & (1 << i)) != 0) continue;

            long cost = tsp(i, next) + w[node][i];
            if (cost < dp[node][visit]) {
                dp[node][visit] = cost;
                parent[node][visit] = i;
            }
        }
        return dp[node][visit];
    }

    public void printOrder(int node, int visit, StringBuilder order) {
        if (visit == (1 <<n) -1) {
            return;
        }

        int nextNode = parent[node][visit];
        order.append(nextNode).append(",");
        printOrder(nextNode, visit | (1 << nextNode), order);
    }

    public ArrayList<LocationOrder> getLocationInOrder(String tripUUID) {

        Trip trip = tripService.findByUUID(tripUUID).get();

        ArrayList<LocationOrder> tripList = locationRepository.findByTrip(trip);
        Collections.sort(tripList);
        return tripList;

    }





}
