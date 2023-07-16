package GraduationProject.TripPlannerZ.repository;

import GraduationProject.TripPlannerZ.domain.Member;
import GraduationProject.TripPlannerZ.dto.MemberTrip;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface MemberRepositoryCustom {

    Page<MemberTrip> tripList(Member member, String sortType, Pageable pageable, String keyWord);

    List<Member> tripMemberList(Long id);
}
