package GraduationProject.TripPlannerZ.domain;

public enum Rank {
    FIRST,
    SECOND,
    THIRD;

    private static final Rank[] rankList = Rank.values();

    public static Rank getRank(int i) {
        return rankList[i];
    }
}
