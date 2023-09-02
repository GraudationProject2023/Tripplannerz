package GraduationProject.TripPlannerZ.config;

import GraduationProject.TripPlannerZ.config.mappers.MemberMapper;
import GraduationProject.TripPlannerZ.domain.Member;
import GraduationProject.TripPlannerZ.dto.member.MemberDto;
import GraduationProject.TripPlannerZ.service.MemberService;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.annotation.PostConstruct;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Collections;
import java.util.Date;
import java.util.Optional;

@RequiredArgsConstructor
@Component
public class UserAuthProvider {

    @Value("${security.jwt.token.secret-key:secret-value}")
    private String secretKey;

    private final MemberService memberService;
    private final MemberMapper memberMapper;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createToken(String email) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + 3_600_000); // 한시간 동안 유효

        return JWT.create()
                .withIssuer(email)
                .withIssuedAt(now)
                .withExpiresAt(validity)
                .sign(Algorithm.HMAC256(secretKey));
    }

    public Authentication validateToken(String token) {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(secretKey))
                .build();

        DecodedJWT decoded = verifier.verify(token);

        Member member = memberService.findByEmail(decoded.getIssuer()).get();
        System.out.println("member.getEmail() = " + member.getEmail());

        return new UsernamePasswordAuthenticationToken(member, null, Collections.emptyList());

    }

    public MemberDto getLoginMember(String token) {

        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(secretKey))
                .build();

        DecodedJWT decoded = verifier.verify(token);

        Member member = memberService.findByEmail(decoded.getIssuer()).get();
        System.out.println("member.getEmail() = " + member.getEmail());

        return memberMapper.toMemberDto(member);
    }

}
