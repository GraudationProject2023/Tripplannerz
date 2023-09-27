package GraduationProject.TripPlannerZ.service;

import GraduationProject.TripPlannerZ.domain.Member;
import GraduationProject.TripPlannerZ.domain.MemberParty;
import GraduationProject.TripPlannerZ.repository.MemberPartyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberPartyService {

    private final MemberPartyRepository memberPartyRepository;

    public boolean tripContainsMember(List<MemberParty> memberPartyList, Member member) {

        for (MemberParty memberParty : memberPartyList) {
            if (memberParty.getMember() == member) return true;
        }

        return false;

    }
}
