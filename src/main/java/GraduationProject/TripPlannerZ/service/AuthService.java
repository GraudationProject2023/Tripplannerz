package GraduationProject.TripPlannerZ.service;

import GraduationProject.TripPlannerZ.util.RedisUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final RedisUtil redisUtil;

    public void logout(String accessToken) {
        redisUtil.setBlackList(accessToken, "BlackList", 3_600_000);
    }
}
