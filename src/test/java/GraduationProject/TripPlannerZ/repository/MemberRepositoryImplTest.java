package GraduationProject.TripPlannerZ.repository;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class MemberRepositoryImplTest {

    @Test
    public void print() {
        LocalDate lt = LocalDate.now();

        String date = "2023-05-11";
        //System.out.println(lt.toString() > date);

    }

}