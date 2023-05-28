package GraduationProject.TripPlannerZ.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class TripImageRepositoryTest {

    @Autowired
    TripImageRepository tripImageRepository;

    @Test
    public void imgUploadTest(@RequestParam MultipartFile[] uploadFile) {

        for (MultipartFile file : uploadFile) {
            if (!file.isEmpty()) {

            }
        }

    }





}