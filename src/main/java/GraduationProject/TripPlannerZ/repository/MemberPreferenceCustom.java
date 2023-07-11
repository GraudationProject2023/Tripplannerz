package GraduationProject.TripPlannerZ.repository;

import GraduationProject.TripPlannerZ.domain.Member;
import GraduationProject.TripPlannerZ.domain.MemberPreference;

import java.util.List;

public interface MemberPreferenceCustom {
    List<MemberPreference> findMemberTypes(Member member);
}
