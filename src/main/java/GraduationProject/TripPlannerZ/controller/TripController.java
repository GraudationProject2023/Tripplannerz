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
import GraduationProject.TripPlannerZ.dto.trip.TripCreate;
import GraduationProject.TripPlannerZ.dto.trip.TripDetail;
import GraduationProject.TripPlannerZ.repository.MemberPartyRepository;
import GraduationProject.TripPlannerZ.repository.TripImageRepository;
import GraduationProject.TripPlannerZ.service.LocationService;
import GraduationProject.TripPlannerZ.service.MemberService;
import GraduationProject.TripPlannerZ.service.PartyService;
import GraduationProject.TripPlannerZ.service.TripService;
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


    @PostMapping("/trip/create")
    public void createTrip(@RequestPart("contentsData") TripCreate tripCreate, @RequestPart("image") MultipartFile uploadFile) throws IOException {
//            @RequestParam("title") String title, @RequestParam("capacity") int capacity,
//                           @RequestParam("closeRecruitDate") String closeRecruitDate,
//                           @RequestParam("goingDate") String goingDate, @RequestParam("comingDate") String comingDate,
//                           @RequestParam("area") String area, @RequestParam("sigungu") String sigungu,
//                           @RequestPart(value = "image", required = false) MultipartFile uploadFile,
//                           HttpServletRequesrt request) throws IOException {

        // 멤버 찾기
//        HttpSession session = request.getSession(false);
//        String email = (String) session.getAttribute("loginMember");
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

        PageRequest pageRequest = PageRequest.of(page, 10);
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

        return tripDetail;
    }

    // 여행 만든사람한테 알림 가게
    @PostMapping("/trip/requestAccompany")
    public ResponseEntity<String> requestAccompany(@RequestBody CommentPost commentPost) {

        Trip trip = tripService.findByUUID(commentPost.getTripUUID()).get();

        if (trip.getCurrentNum() > trip.getRecruitNum()) {
            return ResponseEntity.ok().body("false");
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Member principal = (Member) authentication.getPrincipal();
        Member member = memberService.findByEmail(principal.getEmail()).get();


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

        sseEmitterService.sendRequest(creater, emitter, comment);

        return ResponseEntity.ok().body("true");
    }

    // 승인 요청되면 동행 요청한 사람한테 승인 알림 가게
    @GetMapping("/trip/responseAccompany")
    public void responseAccompany(@RequestBody CommentResponse commentResponse) {

        Trip trip = tripService.findByUUID(commentResponse.getTripUUID()).get();
        Member sender = memberService.findByEmail(commentResponse.getSenderEmail()).get();

        Long partyId = partyService.findPartyByTrip(trip.getId());
        Party party = partyService.findParty(partyId).get();

        MemberParty mp = MemberParty.addPartyMember(sender, party);

        memberPartyRepository.save(mp);
    }
}