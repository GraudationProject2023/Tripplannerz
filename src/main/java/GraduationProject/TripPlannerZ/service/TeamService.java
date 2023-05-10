package GraduationProject.TripPlannerZ.service;

import GraduationProject.TripPlannerZ.domain.Team;
import GraduationProject.TripPlannerZ.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TeamService {
    private final TeamRepository teamRepository;

    @Transactional
    public Long createTeam(Team team){
        teamRepository.save(team);
        return team.getId();
    }
}
