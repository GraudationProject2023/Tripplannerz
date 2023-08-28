package GraduationProject.TripPlannerZ.config.mappers;

import GraduationProject.TripPlannerZ.dto.member.MemberDto;
import GraduationProject.TripPlannerZ.dto.member.MemberRegister;
import GraduationProject.TripPlannerZ.domain.Member;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface MemberMapper {

    MemberDto toMemberDto(Member member);

    @Mapping(target = "pw", ignore = true)    // pw는 무시하고 맵핑, 포맷이 다르기 떄문
    @Mapping(target = "types", ignore = true)
    Member signUptoMember(MemberRegister memberRegister);

}
