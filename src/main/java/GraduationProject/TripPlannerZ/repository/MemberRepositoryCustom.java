package GraduationProject.TripPlannerZ.repository;

import GraduationProject.TripPlannerZ.domain.Member;
import GraduationProject.TripPlannerZ.dto.member.MemberInfo;
import GraduationProject.TripPlannerZ.dto.member.MemberTrip;
import GraduationProject.TripPlannerZ.dto.trip.AccompanyRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface MemberRepositoryCustom {

    Page<MemberTrip> tripList(Member member, String sortType, Pageable pageable, String keyWord);

    List<MemberInfo> tripMemberList(Long id);

    List<AccompanyRequest> accompanyRequestList(Member creater);


}
