package GraduationProject.TripPlannerZ.domain;

import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@SpringBootTest
@Transactional
@Rollback(value = false)

class DomainTest {

    @Autowired
    private EntityManager em;

    @Test
    public void 멤버별_소속팀_출력() {
        List<Member> memberList = em.createQuery("select m from Member m", Member.class).getResultList();

        for (Member member : memberList) {
            System.out.println("member.getId() = " + member.getId());

            List<MemberTeam> memberTeamList = member.getMemberTeamList();
            for (MemberTeam memberTeam : memberTeamList) {
                System.out.println("memberTeam.getTeam().getId() = " + memberTeam.getTeam().getId());
            }
        }
    }

    @Test
    public void 팀별_멤버_출력() {

        Member member = em.find(Member.class, 2L);

        member.exit();
        em.remove(member);

        List<Team> teamList = em.createQuery("select t from Team t", Team.class).getResultList();

        for (Team team : teamList) {
            System.out.println("team.getId() = " + team.getId());

            List<MemberTeam> memberTeamList = team.getMemberTeamList();
            for (MemberTeam memberTeam : memberTeamList) {
                System.out.println("memberTeam.getMember().getId() = " + memberTeam.getMember().getId());
            }
        }
    }

    @Test
    public void 팀별_여행일정_출력() {
        List<Team> teamList = em.createQuery("select t from Team t", Team.class).getResultList();

        for (Team team : teamList) {
            System.out.println("team.getId() = " + team.getId());

            List<Trip> tripList = team.getTripList();
            for (Trip trip : tripList) {
                System.out.println("trip.getTitle() = " + trip.getTitle());
            }
        }
    }

    @Test
    public void 여행일정별_경유지_출력() {
        List<Trip> tripList = em.createQuery("select t from Trip t", Trip.class).getResultList();

        for (Trip trip : tripList) {
            System.out.println("trip.getTitle() = " + trip.getTitle());

            List<TripLocation> tripLocationList = trip.getTripLocationList();
            for (TripLocation tripLocation : tripLocationList) {
                System.out.println("tripLocation.getLocation().getName() = " + tripLocation.getLocation().getName());
            }
        }
    }

    @Test
    public void 그룹_탈퇴() {
        MemberTeam memberTeam = em.find(MemberTeam.class, 1L);
        memberTeam.exitMemberTeam();
        em.remove(memberTeam);
    }

    @Test
    public void 팀삭제시_여행일정삭제() {
        Team team = em.find(Team.class, 2L);
        Team team = em.find(Team.class, 1L);
        em.remove(team);
    }

    @Test
    public void 회원탈퇴(){
        Member member = em.find(Member.class, 1L);

        member.exit();
        em.remove(member);
    }
}