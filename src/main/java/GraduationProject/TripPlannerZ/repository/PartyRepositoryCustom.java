package GraduationProject.TripPlannerZ.repository;

import java.util.List;

public interface PartyRepositoryCustom {

    List<Long> noMemberParty();

    Long findPartyIdByTripId(Long tripId);
}
