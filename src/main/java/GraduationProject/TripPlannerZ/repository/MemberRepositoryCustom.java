package GraduationProject.TripPlannerZ.repository;

import GraduationProject.TripPlannerZ.dto.MemberTrip;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MemberRepositoryCustom {

    Page<MemberTrip> tripList(String username, String sortType, Pageable pageable, String keyWord);
}
