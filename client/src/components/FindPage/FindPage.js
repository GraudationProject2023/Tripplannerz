import React, { useCallback, useState, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Navbar from "../Navbar/Navbar";
import { Form, Button } from "react-bootstrap";
import DatePicker, { Calendar } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import "./FindPage.css";
import axios from "axios";
import Slider, { Range } from "rc-slider";
axios.withCredentials = true;

function FindPage() {
  let token = localStorage.getItem("token");
  const [title, setTitle] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [date, setDate] = useState("");
  const [going, setGoing] = useState("");
  const [coming, setComing] = useState("");
  const [selectedMainCategory, setSelectedMainCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [image, setImage] = useState([]);
  const [preview, setPreview] = useState([]);

  const [currentMonth, setCurrentMonth] = useState(
    new Date(moment().startOf("day"))
  );
  const [nextMonth, setNextMonth] = useState(
    new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
  );
  const handleCurrentMonthChange = (date) => {
    setCurrentMonth(date);
  };

  const handleNextMonthChange = (date) => {
    setNextMonth(date);
  };

  const disableNextMonthDates = (date) => {
    return (
      date >
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        currentMonth.getDate() - 1
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("cast", 1);
    localStorage.setItem("rank", -1);
    localStorage.setItem("vest", 1);
    document.cookie =
      "cookieName=JSESSIONID; expires=THU, 01 Jan 1970 00:00:00 UTC; path=/;";
  }, []);

  //카테고리
  const mainCategories = ["특별시/도", "광역시", "도"];
  const categories = {
    "특별시/도": ["서울", "세종", "제주"],
    광역시: ["인천", "대전", "대구", "광주", "울산", "부산"],
    도: ["경기", "강원", "충북", "충남", "전북", "전남", "경북", "경남"],
  };
  const subCategories = {
    서울: [
      "강남구",
      "강동구",
      "강북구",
      "강서구",
      "관악구",
      "광진구",
      "구로구",
      "금천구",
      "노원구",
      "도봉구",
      "동대문구",
      "동작구",
      "마포구",
      "서대문구",
      "서초구",
      "성동구",
      "성북구",
      "송파구",
      "양천구",
      "영등포구",
      "용산구",
      "은평구",
      "종로구",
      "중구",
      "중랑구",
    ],
    인천: [
      "계양구",
      "남동구",
      "동구",
      "미추홀구",
      "부평구",
      "서구",
      "연수구",
      "중구",
      "강화군",
      "옹진군",
    ],
    세종: ["세종"],
    대전: ["대덕구", "동구", "서구", "유성구", "중구"],
    대구: [
      "남구",
      "동구",
      "달서구",
      "북구",
      "서구",
      "수성구",
      "중구",
      "달성군",
    ],
    광주: ["광산구", "남구", "동구", "북구", "서구"],
    울산: ["남구", "동구", "북구", "중구", "울주군"],
    부산: [
      "강서구",
      "금정구",
      "남구",
      "동구",
      "동래구",
      "북구",
      "부산진구",
      "사상구",
      "사하구",
      "서구",
      "수영구",
      "연제구",
      "영도구",
      "중구",
      "해운대구",
      "기장군",
    ],
    제주: ["제주", "서귀포"],
    경기: [
      "고양시",
      "과천시",
      "광명시",
      "광주시",
      "구리시",
      "군포시",
      "김포시",
      "남양주시",
      "동두천시",
      "부천시",
      "성남시",
      "수원시",
      "시흥시",
      "안산시",
      "안성시",
      "안양시",
      "양주시",
      "여주시",
      "오산시",
      "용인시",
      "의왕시",
      "의정부시",
      "이천시",
      "파주시",
      "평택시",
      "포천시",
      "하남시",
      "화성시",
      "가평군",
      "양평군",
      "연천군",
    ],
    강원: [
      "강릉시",
      "동해시",
      "삼척시",
      "속초시",
      "원주시",
      "춘천시",
      "태백시",
      "고성군",
      "양구군",
      "양양군",
      "영월군",
      "인제군",
      "정선군",
      "철원군",
      "평창군",
      "홍천군",
      "화천군",
      "횡성군",
    ],
    충북: [
      "제천시",
      "청주시",
      "충주시",
      "괴산군",
      "단양군",
      "보은군",
      "영동군",
      "옥천군",
      "음성군",
      "증평군",
      "진천군",
    ],
    충남: [
      "계룡시",
      "공주시",
      "논산시",
      "당진시",
      "보령시",
      "서산시",
      "아산시",
      "천안시",
      "금산군",
      "부여군",
      "서천군",
      "예산군",
      "청양군",
      "태안군",
      "홍성군",
    ],
    전북: [
      "군산시",
      "김제시",
      "남원시",
      "익산시",
      "전주시",
      "정읍시",
      "고창군",
      "무주군",
      "부안군",
      "순창군",
      "완주군",
      "임실군",
      "장수군",
      "진안군",
    ],
    전남: [
      "광양시",
      "나주시",
      "목포시",
      "순천시",
      "여수시",
      "강진군",
      "고흥군",
      "곡성군",
      "구례군",
      "담양군",
      "무안군",
      "보성군",
      "신안군",
      "영광군",
      "영암군",
      "완도군",
      "장성군",
      "장흥군",
      "진도군",
      "함평군",
      "해남군",
      "화순군",
    ],
    경북: [
      "경산시",
      "경주시",
      "구미시",
      "김천시",
      "문경시",
      "상주시",
      "안동시",
      "영주시",
      "영천시",
      "포항시",
      "고령군",
      "봉화군",
      "성주군",
      "영덕군",
      "영양군",
      "예천군",
      "울릉군",
      "울진군",
      "의성군",
      "청도군",
      "청송군",
      "칠곡군",
    ],
    경남: [
      "거제시",
      "김해시",
      "밀양시",
      "사천시",
      "양산시",
      "진주시",
      "창원시",
      "통영시",
      "거창군",
      "고성군",
      "남해군",
      "산청군",
      "의령군",
      "창녕군",
      "하동군",
      "함안군",
      "함양군",
      "합천군",
    ],
  };
  const handleMainCategoryChange = (category) => {
    if (selectedMainCategory === category) {
      setSelectedMainCategory("");
      setSelectedCategory("");
    } else {
      setSelectedMainCategory(category);
      setSelectedCategory("");
    }
  };

  const handleCategoryChange = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory("");
      setSelectedSubCategory("");
    } else {
      setSelectedCategory(category);
      setSelectedSubCategory("");
    }
  };

  const handleSubCategoryChange = (subCategory) => {
    setSelectedSubCategory(subCategory);
  };

  const onChangeImageInput = (e) => {
    setImage([e.target.files[0]]);

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setPreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    var closeRecruitDate = date.toString();
    var goingDate = currentMonth.toISOString().slice(0, 10);
    var comingDate = nextMonth.toISOString().slice(0, 10);
    var area = selectedCategory;
    var sigungu = selectedSubCategory;

    console.log(goingDate);
    console.log(comingDate);

    formData.append("image", image[0]);
    const contentsData = {
      title,
      capacity,
      closeRecruitDate,
      goingDate,
      comingDate,
      area,
      sigungu,
    };

    formData.append(
      "contentsData",
      new Blob([JSON.stringify(contentsData)], { type: "application/json" })
    );

    if (
      !image ||
      !title ||
      !capacity ||
      !closeRecruitDate ||
      !goingDate ||
      !comingDate ||
      !area ||
      !sigungu
    ) {
      alert("모든 항목을 입력해주세요.");
    } else {
      axios
        .post("http://localhost:8080/api/trip/create", formData, {
          headers: { "Content-Type": "multipart/form-data", "Authorization": `Bearer ${token}`},
        })
        .then((response) => {
          alert("여행이 생성되었습니다!");
          console.log(response);
          console.log(formData);
          window.location.href = "/main";
        })
        .catch((response) => {
          alert("오류가 발생하였습니다.");
          console.log(response);
          console.log(formData);
        });
    }
  };

  return (
    <div className="Structure">
      {console.log(image)}
      <Navbar />
      <div className="Find">
        <div className="Title">
          <h2>동행자 모집하기</h2>
        </div>
        <br />
        <Form
          style={{
            border: "1px solid black",
            borderRadius: "10px",
            height: "400px",
          }}
        >
          <table>
            <tbody>
              <tr>
                <td>
                  <div
                    style={{
                      width: "100px",
                      height: "370px",
                      marginTop: "20px",
                    }}
                  >
                    {mainCategories.map((category) => (
                      <div
                        key={category}
                        className={
                          selectedMainCategory === category
                            ? "selected-main-category"
                            : "main-category"
                        }
                        onClick={() => handleMainCategoryChange(category)}
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                </td>
                <td>
                  <div
                    style={{
                      width: "100px",
                      height: "370px",
                      marginLeft: "50px",
                    }}
                  >
                    {selectedMainCategory && (
                      <div className="sub-category-container">
                        {categories[selectedMainCategory].map((category) => (
                          <div
                            key={category}
                            className={`sub-category ${
                              selectedCategory === category
                                ? "selected-sub-category"
                                : ""
                            }`}
                            onClick={() => handleCategoryChange(category)}
                          >
                            {category}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
                <td>
                  <div
                    style={{
                      width: "1200px",
                      height: "370px",
                      marginLeft: "50px",
                    }}
                  >
                    {selectedCategory && (
                      <div className="sub-category-container">
                        {subCategories[selectedCategory].map(
                          (subCategory, index) => (
                            <div
                              key={subCategory}
                              className={`sub-category ${
                                selectedSubCategory === subCategory
                                  ? "selected-sub-category"
                                  : ""
                              }`}
                              onClick={() =>
                                handleSubCategoryChange(subCategory)
                              }
                            >
                              {subCategory}
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </Form>
        <br />
        <br />
        <div className="subtitle">
          <h3>정보</h3>
        </div>
        <hr />
        <Form onSubmit={handleSubmit}>
          <table>
            <td>
              <div className="image-title">
                <Form.Group controlId="form-Image">
                  <Form.Label>사진 업로드</Form.Label>
                  <table>
                    <tr>
                      <Form.Control
                        style={{ width: "300px" }}
                        type="file"
                        onChange={onChangeImageInput}
                      />
                    </tr>
                    <br />
                    <tr>
                      {preview ? (
                        <img
                          style={{ width: "100px", height: "150px" }}
                          src={preview}
                        />
                      ) : (
                        <img
                          style={{ width: "100px", height: "150px" }}
                          alt="기본페이지"
                        />
                      )}
                    </tr>
                  </table>
                </Form.Group>
              </div>
            </td>
            <td>
              <div className="form-Title">
                <Form.Group controlId="formTitle">
                  <Form.Label>제목</Form.Label>
                  <Form.Control
                    style={{ width: "300px" }}
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>
              </div>
            </td>
          </table>
          <div className="form-Number">
            <Form.Group controlId="formCapacity">
              <Form.Label>모집인원</Form.Label>
              <Slider onAfterChange={(e) => setCapacity(e)} />
              {Math.ceil(capacity / 10)}명
            </Form.Group>
          </div>

          <div className="form-Date">
            <Form.Group controlId="formDate">
              <Form.Label>마감날짜</Form.Label>
              <Form.Control
                style={{ width: "300px" }}
                type="date"
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
          </div>
          <div className="form-Itinerary">
            <Form.Group controlId="formItinerary">
              <table>
                <td>
                  <Form.Label>가는 날</Form.Label>
                  <DatePicker
                    selected={currentMonth}
                    onChange={handleCurrentMonthChange}
                    placeholderText="가는 날 선택"
                    popperPlacement="bottom-start"
                    className="goingDate"
                  />
                  {/*<Form.Control style={{width: "300px"}} type="date" onChange={(e) => setGoing(e.target.value)} />*/}
                </td>
                <td>
                  <Form.Label>오는 날</Form.Label>
                  <DatePicker
                    selected={nextMonth}
                    filterDate={disableNextMonthDates}
                    onChange={handleNextMonthChange}
                    placeholderText="오는 날 선택"
                    popperPlacement="bottom-start"
                    className="comingDate"
                  />
                  {/*<Form.Control style={{width: "300px"}} type="date" onChange={(e) => setComing(e.target.value)} />*/}
                </td>
              </table>
            </Form.Group>
          </div>
          <div className="form-Footer">
            <hr />
            <Button
              style={{ width: "200px", marginLeft: "45%" }}
              variant="primary"
              type="submit"
            >
              등록
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default FindPage;
