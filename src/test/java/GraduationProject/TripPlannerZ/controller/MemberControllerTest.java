package GraduationProject.TripPlannerZ.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
class MemberControllerTest {

    @Test
    public void test(HttpServletRequest request){
        String confirmCode = (String) request.getSession().getAttribute("code");
        System.out.println("confirmCode = " + confirmCode);
    }
}