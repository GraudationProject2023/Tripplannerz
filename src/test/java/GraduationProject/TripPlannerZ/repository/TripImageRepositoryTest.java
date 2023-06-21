package GraduationProject.TripPlannerZ.repository;

import GraduationProject.TripPlannerZ.domain.Trip;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@SpringBootTest
@Transactional
class TripImageRepositoryTest {

    @Autowired
    TripImageRepository tripImageRepository;
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    TripRepository tripRepository;



    @Test
    public void imgUploadTest(@RequestParam MultipartFile[] uploadFile) {

        Trip trip = tripRepository.findById(1L).get();

//        for (MultipartFile file : uploadFile) {
//            if (!file.isEmpty()) {
//
//            }
//        }

    }





}