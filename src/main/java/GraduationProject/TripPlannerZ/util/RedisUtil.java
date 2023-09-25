package GraduationProject.TripPlannerZ.util;


import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.time.Duration;

@RequiredArgsConstructor
@Service
public class RedisUtil {

    private final StringRedisTemplate redisTemplate;
    private final StringRedisTemplate blackList;

    public String getData(String key) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        return valueOperations.get(key);
    }

    public void setDataExpire(String key, String value, long duration) {
        // duration 동안만 (key, value) 저장
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        Duration expireDuration = Duration.ofSeconds(duration);
        valueOperations.set(key, value, expireDuration);
    }

    public void setBlackList(String key, String value, long duration) {
        ValueOperations<String, String> valueOperations = blackList.opsForValue();
        Duration expireDuration = Duration.ofSeconds(duration);
        valueOperations.set(key, "BlackList", expireDuration);
    }

    public void deleteData(String key) {
        // 데이터 삭제
        redisTemplate.delete(key);
    }

    public boolean existData(String key) {
        return Boolean.TRUE.equals(redisTemplate.hasKey(key));
    }

    public boolean existBlackList(String key) {
        return Boolean.TRUE.equals(blackList.hasKey(key));
    }

}
