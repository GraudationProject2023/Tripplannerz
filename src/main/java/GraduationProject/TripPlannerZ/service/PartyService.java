package GraduationProject.TripPlannerZ.service;

import GraduationProject.TripPlannerZ.domain.Party;
import GraduationProject.TripPlannerZ.repository.PartyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PartyService {

    private final PartyRepository partyRepository;

    @Transactional
    public Long createParty(Party party){
        partyRepository.save(party);
        return party.getId();
    }
}
