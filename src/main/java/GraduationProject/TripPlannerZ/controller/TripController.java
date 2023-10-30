package GraduationProject.TripPlannerZ.controller;

import GraduationProject.TripPlannerZ.API.Item;
import GraduationProject.TripPlannerZ.cityNum.Area;
import GraduationProject.TripPlannerZ.cityNum.Sigungu;
import GraduationProject.TripPlannerZ.cityNum.SigunguRepository;
import GraduationProject.TripPlannerZ.comment.Comment;
import GraduationProject.TripPlannerZ.comment.CommentService;
import GraduationProject.TripPlannerZ.comment.TripComment;
import GraduationProject.TripPlannerZ.domain.*;
import GraduationProject.TripPlannerZ.dto.CommentPost;
import GraduationProject.TripPlannerZ.dto.CommentResponse;
import GraduationProject.TripPlannerZ.dto.member.MemberInfo;
import GraduationProject.TripPlannerZ.dto.member.MemberTrip;
import GraduationProject.TripPlannerZ.dto.trip.AccompanyRequest;
import GraduationProject.TripPlannerZ.dto.trip.TripCreate;
import GraduationProject.TripPlannerZ.dto.trip.TripDelete;
import GraduationProject.TripPlannerZ.dto.trip.TripDetail;
import GraduationProject.TripPlannerZ.repository.MemberPartyRepository;
import GraduationProject.TripPlannerZ.repository.TripImageRepository;
import GraduationProject.TripPlannerZ.service.*;
import GraduationProject.TripPlannerZ.sseEmitter.SseEmitterService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
//@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"}, allowCredentials = "true")
public class TripController {

    private final TripService tripService;
    private final MemberService memberService;
    private final PartyService partyService;
    private final MemberPartyRepository memberPartyRepository;
    private final SigunguRepository sigunguRepository;
    private final TripImageRepository tripImageRepository;
    private final LocationService locationService;
    private final CommentService commentService;
    private final SseEmitterService sseEmitterService;
    private final LoginService loginService;
    private final MemberPartyService memberPartyService;


    @PostMapping("/trip/create")
    public void createTrip(@RequestPart("contentsData") TripCreate tripCreate, @RequestPart("image") MultipartFile uploadFile) throws IOException {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Member principal = (Member) authentication.getPrincipal();

        Member member = memberService.findByEmail(principal.getEmail()).get();


        // 해당 멤버가 group 생성
        Party party = Party.builder()
                .memberPartyList(new ArrayList<>())
                .build();
        partyService.createParty(party);

        MemberParty memberParty = MemberParty.addPartyMember(member, party);
        memberPartyRepository.save(memberParty);

        // 도시 번호 지정
        Sigungu sigunguNum = sigunguRepository.findByName(tripCreate.getSigungu());
        Area areaNum = sigunguNum.getArea();


        // group에서 여행 일정 생성
        Trip trip = Trip.builder()
                .title(tripCreate.getTitle())
                .tripImage(new ArrayList<>())
                .recruitNum(tripCreate.getCapacity())
                .currentNum(1)
                .startingDate(tripCreate.getGoingDate())
                .comingDate(tripCreate.getComingDate())
                .closeRecruitDate(tripCreate.getCloseRecruitDate())
                .party(party)
                .areaCode(areaNum.getCode())
                .sigunguCode(sigunguNum.getCode())
                .creater(member)
                .build();
        tripService.createTrip(trip);

        // 이미지 넣기 추가
        TripImage tripImage = TripImage.builder().trip(trip).build();
        tripImageRepository.save(tripImage);
        File newFile = new File(tripImage.getImg_uuid() + ".png");
        uploadFile.transferTo(newFile);

    }

    @GetMapping("/trip/send")
    public void tripDetailed(Model model) {
        // imgPath를 properties에 저장해서 static 값 가져오는거로 수정해야됨
        String imgPath = "/Users/seongbochoi/trip_image/e276a5b3-af89-453f-bd6d-62f52ce33ff2";
        model.addAttribute("imgPath", imgPath);
    }

    @GetMapping("/trip/tripList")
    public Page<MemberTrip> tripSearch(@RequestParam("page") int page,
                                       @RequestParam("sortType") String sortType,
                                       @RequestParam("keyWord") String keyWord) {

        PageRequest pageRequest = PageRequest.of(page, 2);
        return memberService.findTrip(null, sortType, pageRequest, keyWord);
    }

    @GetMapping("/trip/locationList")
    public List<Item> getLocationList() {
        return locationService.locationListByArea("1", "1");
    }

    @GetMapping("/trip/detail/{id}")
    public TripDetail getTripDetail(@PathVariable("id") Long id) {

        List<MemberInfo> memberList = memberService.memberList(id);
        Trip trip = tripService.findById(id).get();

        List<TripComment> commentList = commentService.getCommentList(trip.getUUID());

        TripDetail tripDetail = new TripDetail(trip.getId(), trip.getUUID(), trip.getTitle(),
                trip.getStartingDate(), trip.getComingDate(), trip.getContent(),
                memberList.size(), memberList, commentList);

        Member loggedInMember = loginService.getLoggedInMember();
        List<MemberParty> membersInTrip = memberPartyRepository.findAllByPartyId(trip.getParty().getId());
        if (!memberPartyService.tripContainsMember(membersInTrip, loggedInMember)) {
            tripService.hitTrip(id);
        }


        return tripDetail;
    }

    // 여행 만든사람한테 알림 가게
    @PostMapping("/trip/requestAccompany")
    public ResponseEntity<String> requestAccompany(@RequestBody CommentPost commentPost) {

        System.out.println("tripUUID = " + commentPost.getTripUUID());
        Trip trip = tripService.findByUUID(commentPost.getTripUUID()).get();
        System.out.println("trip = " + trip.getTitle());

        if (trip.getCurrentNum() > trip.getRecruitNum()) {
            return ResponseEntity.ok().body("false");
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Member principal = (Member) authentication.getPrincipal();
        Member member = memberService.findByEmail(principal.getEmail()).get();
        System.out.println("member = " + member.getEmail());


        Member creater = trip.getCreater();
        SseEmitter emitter = sseEmitterService.findEmitterByMember(creater.getId());


        String curDateTime = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss").format(LocalDateTime.now());
        Comment comment = Comment.builder()
                .type("AccompanyRequest")
                .review(commentPost.getReview())
                .trip(trip)
                .postDate(curDateTime)
                .sender(member)
                .build();

        commentService.saveComment(comment);

        TripComment tripComment = TripComment.builder()
                .comment(comment)
                .build();

        sseEmitterService.sendRequest(creater, emitter, tripComment);

        return ResponseEntity.ok().body("true");
    }

    // 승인 요청되면 동행 요청한 사람한테 승인 알림 가게
    @PostMapping("/trip/responseAccompany/{check}")
    public void responseAccompany(@PathVariable("check") boolean check, @RequestBody CommentResponse commentResponse) {

        if(!check)
        {
            // x일때 알림
            commentService.delete(commentResponse.getComment_id());
            return;
        }

        Trip trip = commentService.getCommentById(commentResponse.getComment_id()).getTrip();
        Member sender = commentService.getCommentById(commentResponse.getComment_id()).getSender();

        Long partyId = partyService.findPartyByTrip(trip.getId());
        Party party = partyService.findParty(partyId).get();

        MemberParty mp = MemberParty.addPartyMember(sender, party);
        trip.setCurrentNum(trip.getCurrentNum() + 1);

        memberPartyRepository.save(mp);
        commentService.delete(commentResponse.getComment_id());
        // o일 때 알림
    }

    @PostMapping("/trip/delete")
    public ResponseEntity<String> deleteTrip(@RequestBody TripDelete tripDelete) {
        Member member = loginService.getLoggedInMember();
        Trip trip = tripService.findByUUID(tripDelete.getTripUUID()).get();
        Member creater = memberService.findByEmail(trip.getCreater().getEmail()).get();

        if (member != creater) {
            return ResponseEntity.ok().body("not allowed");
        }

        tripService.deleteTrip(trip);

        return ResponseEntity.ok().body("deleted");
    }

    @GetMapping("/trip/accompany/requestList")
    public List<AccompanyRequest> requestList() {
        Member member = loginService.getLoggedInMember();
        return memberService.accompanyRequestList(member);
    }
}