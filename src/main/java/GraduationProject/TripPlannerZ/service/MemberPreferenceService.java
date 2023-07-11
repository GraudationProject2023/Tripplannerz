package GraduationProject.TripPlannerZ.service;

import GraduationProject.TripPlannerZ.domain.Member;
import GraduationProject.TripPlannerZ.domain.MemberPreference;
import GraduationProject.TripPlannerZ.repository.MemberPreferenceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberPreferenceService {

    private final MemberPreferenceRepository memberPreferenceRepository;

    // 선호 태그 설정
    @Transactional
    public void setTypes(Member member, String types) {
        String[] preferenceList = types.split(",");

        for (int i = 0; i < preferenceList.length; i++) {
            MemberPreference memberPreference = MemberPreference.setTypes(preferenceList[i], member, i);
            memberPreferenceRepository.save(memberPreference);
        }
    }

    // 선호 태그 삭제
    @Transactional
    public void deleteTypes(Member member) {
        List<MemberPreference> memberPreferenceList = memberPreferenceRepository.findMemberTypes(member);

        for (MemberPreference memberPreference : memberPreferenceList) {
            memberPreferenceRepository.delete(memberPreference);
        }
    }
}
