package GraduationProject.TripPlannerZ.controller;

import GraduationProject.TripPlannerZ.CityNum.Area;
import GraduationProject.TripPlannerZ.CityNum.Sigungu;
import GraduationProject.TripPlannerZ.CityNum.SigunguRepository;
import GraduationProject.TripPlannerZ.domain.*;
import GraduationProject.TripPlannerZ.dto.Location;
import GraduationProject.TripPlannerZ.dto.MemberTrip;
import GraduationProject.TripPlannerZ.dto.TripCreate;
import GraduationProject.TripPlannerZ.repository.MemberPartyRepository;
import GraduationProject.TripPlannerZ.repository.TripImageRepository;
import GraduationProject.TripPlannerZ.service.LocationService;
import GraduationProject.TripPlannerZ.service.MemberService;
import GraduationProject.TripPlannerZ.service.PartyService;
import GraduationProject.TripPlannerZ.service.TripService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"}, allowCredentials = "true")
public class TripController {

    private final TripService tripService;
    private final MemberService memberService;
    private final PartyService partyService;
    private final MemberPartyRepository memberPartyRepository;
    private final SigunguRepository sigunguRepository;
    private final TripImageRepository tripImageRepository;
    private final LocationService locationService;

    @PostMapping("/trip/create")
    public void createTrip(@RequestPart("contentsData") TripCreate tripCreate, @RequestPart("image") MultipartFile uploadFile,
                           HttpServletRequest request) throws IOException {
//            @RequestParam("title") String title, @RequestParam("capacity") int capacity,
//                           @RequestParam("closeRecruitDate") String closeRecruitDate,
//                           @RequestParam("goingDate") String goingDate, @RequestParam("comingDate") String comingDate,
//                           @RequestParam("area") String area, @RequestParam("sigungu") String sigungu,
//                           @RequestPart(value = "image", required = false) MultipartFile uploadFile,
//                           HttpServletRequesrt request) throws IOException {

        // 멤버 찾기
        HttpSession session = request.getSession(false);
        String email = (String) session.getAttribute("loginMember");
        Member member = memberService.findByEmail(email).get();

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
                .startingDate(tripCreate.getGoingDate())
                .comingDate(tripCreate.getComingDate())
                .closeRecruitDate(tripCreate.getCloseRecruitDate())
                .party(party)
                .areaCode(areaNum.getCode())
                .sigunguCode(sigunguNum.getCode())
                .build();
        tripService.createTrip(trip);

        // 이미지 넣기 추가
        TripImage tripImage = TripImage.builder().trip(trip).build();
        tripImageRepository.save(tripImage);
        File newFile = new File(tripImage.getImg_uuid() + ".png");
        uploadFile.transferTo(newFile);


        // 이미지 파일로 변환
//        byte[] fileData = uploadFile.getBytes();
//        File newFile = new File(tripImage.getImg_uuid());
//        FileOutputStream fos = new FileOutputStream(newFile);
//        fos.write(fileData);
//        fos.close();

        /*
        byte[] fileData = multipartFile.getBytes();

        // 이미지 파일로 변환
        File outputFile = new File(outputPath);
        FileOutputStream fileOutputStream = new FileOutputStream(outputFile);
        fileOutputStream.write(fileData);
        fileOutputStream.close();
         */


        System.out.println("uploadFile = " + uploadFile);


//        for (MultipartFile file : uploadFile) {
//            if(!file.isEmpty()) {
//                TripImage tripImage = TripImage.builder().trip(trip).build();
//                tripImageRepository.save(tripImage);
//
//                File newFile = new File(tripImage.getImg_uuid());
//                file.transferTo(newFile);
//            }
//        }
    }

    @PostMapping("/trip/select")
    public void selectSigungu() {

    }

    @GetMapping("/trip/send")
    public void tripDetailed(Model model) {
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
    public List<Location> getLocationList() {
        return locationService.locationListByArea("1", "1");
    }
}
