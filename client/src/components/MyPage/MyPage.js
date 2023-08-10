import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import Navbar from "../Navbar/Navbar";
import "./MyPage.css";
import Menu from "../Image/Menu.png";
import notice from "../Image/notice.png";
import sight from "../Image/관광지.png";
import culture from "../Image/문화시설.png";
import festival from "../Image/축제.png";
import surfing from "../Image/서핑.png";
import hotel from "../Image/호텔.png";
import shopping from "../Image/쇼핑.png";
import restaurant from "../Image/레스토랑.png";
import axios from "axios";
import Pagination from "./utils/SchedulePagination";
axios.default.withCredentials = true;

function MyPage() {
  const [name, setName] = useState(""); //프로필 이름
  const [gender, setGender] = useState(""); //프로필 성별
  const [email, setEmail] = useState(""); //프로필 이메일
  const [rank, setRank] = useState([]); //프로필 선호 태그
  const [currentPage, setCurrentPage] = useState("profile"); //메뉴 토글
  const [preview, setPreview] = useState([]);
  const [create, setCreate] = useState(0); //생성한 일정 개수
  const [pw, setPw] = useState(""); //현재 패스워드
  const [password, setPassword] = useState(""); // 수정할 패스워드
  const [withdrawPassword, setWithdrawPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); //수정할 패스워드 확인
  const [correct, setCorrect] = useState(false); // 비밀번호 일치 여부
  const [posts, setPosts] = useState([]); //페이지마다 띄울 게시판 목록
  const [postNumber, setPostNumber] = useState([]); // 각 목록 번호
  const [postsPerPage, setPostsPerPage] = useState(10); //페이지마다 띄울 게시판 목록 개수
  var [currentNumber, setCurrentNumber] = useState(0); //현재 페이지 번호
  const [totalPage, setTotalPage] = useState(0); //전체 페이지 개수
  const [total, setTotal] = useState(13); //전체 목록 개수
  const [order, setOrder] = useState("기본"); //버튼 정렬 기준
  const [keyword, setKeyword] = useState(""); // 일정 검색어
  const [loading, setLoading] = useState(false);

  const [nestedModal, setNestedModal] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [withdrawModal, setWithdrawModal] = useState(false);

  var ranklist = "";
  var size = posts.length;
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = (posts) => {
    let currentPosts = 0;
    currentPosts = posts.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };

  useEffect(() => {
    localStorage.setItem("cast", 1);
    localStorage.setItem("rank", -1);
    localStorage.setItem("vest", 1);
    document.cookie =
      "cookieName=JSESSIONID; expires=THU, 01 Jan 1970 00:00:00 UTC; path=/;";
    axios.get("http://localhost:8080/api/members/tripInfo").then((response) => {
      setName(response.data.name);
      setGender(response.data.gender);
      setEmail(response.data.email);
      setRank(response.data.preferences);
    });
  }, []);

  useEffect(() => {
    console.log(currentNumber);
    const fetchData = async () => {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/members/tripList?page=${currentNumber}&sortType=${order}`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      console.log(response.data.totalPages);
      console.log(response.data.totalElements);
      console.log(response.data.content);
      const postNumberArray = response.data.content.map((post) => post.id);
      setPostNumber(postNumberArray);
      setPosts(response.data.content);
      setTotal(response.data.totalElements);
      setTotalPage(response.data.totalPages);
      setLoading(false);
    };

    fetchData();
  }, [currentNumber, order]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/trip/search?page=${currentNumber}&sortType=${order}&keyWord=${keyword}`,
        {
          withCredentials: true,
        }
      );

      console.log(response.data);
      setPosts(response.data.content);
      setTotal(response.data.totalElements);
      setTotalPage(response.data.totalPages);
    };
  }, [keyword]);

  const handleSelectOrder = (e) => {
    const value = e.target.value;
    setOrder(value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleWithdrawPassword = (e) => {
    setWithdrawPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    const CONFIRMPASSWORD = event.target.value;
    if (confirmPassword !== password.slice(0, -1)) {
      console.log("error");
      setCorrect(false);
    } else {
      console.log("success");
      setCorrect(true);
    }
    setConfirmPassword(CONFIRMPASSWORD);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  const Button1 = () => {
    const arr = [
      { id: 1, name: "관광지", code: "SIGHTSEEING", image: sight },
      { id: 2, name: "문화시설", code: "CULTURE", image: culture },
      { id: 3, name: "축제 • 공연", code: "FESTIVAL", image: festival },
      { id: 4, name: "레포츠", code: "LEISURE", image: surfing },
      { id: 5, name: "호캉스", code: "VACATION", image: hotel },
      { id: 6, name: "쇼핑", code: "SHOPPING", image: shopping },
      { id: 7, code: "RESTAURANT", name: "맛집탐방", image: restaurant },
    ];

    const [pick1, setPick1] = useState(arr);
    const [select1, setSelect1] = useState([]);
    const [ranking, setRanking] = useState([]);
    const [show, setShow] = useState([]);

    const handleButtonClick = (itemId) => {
      if (select1.includes(itemId)) {
        setSelect1(select1.filter((button) => button !== itemId));
      } else if (select1.length < 3) {
        setSelect1((select1) => [...select1, itemId]);
      }
    };

    const setRankingText = () => {
      const rankingText = [];
      const rankingShow = [];
      for (let i = 0; i < select1.length; i++) {
        const button = pick1.find((item) => item.id === select1[i]);
        rankingShow.push(`${i + 1}순위`);
        rankingText.push(`${button.code}`);
      }
      setShow(rankingShow);
      setRanking(rankingText);
      if (rankingText.length === 0) {
        localStorage.setItem("rank", -1);
      } else {
        localStorage.setItem("rank", rankingText);
      }
    };

    useEffect(() => {
      setRankingText();
    }, [select1]);

    return (
      <div>
        <div>
          {pick1.map((item) => (
            <div
              key={item.id}
              className={
                select1.includes(item.id)
                  ? "button_table_btn_ns"
                  : "button_table_btn_s"
              }
              onClick={() => handleButtonClick(item.id)}
            >
              <img
                style={{ width: "50px", height: "50px", marginTop: "5px" }}
                src={item.image}
                alt={item.name}
                className="card_image"
              />
              <div
                style={{ marginTop: "5px", fontSize: "18px" }}
                className="card_text"
              >
                {item.name}
              </div>
              {select1.includes(item.id) && (
                <div className="rank_text">
                  {show[select1.indexOf(item.id)]}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleCloseNested = () => {
    var res = localStorage.getItem("rank");
    if (res === "-1") {
      alert("태그를 최소 1개 이상 선택하셔야 합니다.");
    } else {
      var ranks = localStorage.getItem("rank");
      console.log(ranks);
      axios
        .post("http://localhost:8080/api/members/change/types", {
          types: ranks,
        })
        .then((res) => console.log(res), alert("태그가 변경되었습니다."));

      setNestedModal(false);
    }
  };
  const handleNestedModal = () => {
    setNestedModal(true);
  };

  const handleToggle = () => {
    if (toggle === false) {
      setToggle(true);
    } else if (toggle === true) {
      setToggle(false);
    }
  };

  const handleWithdrawModal = () => {
    if (toggle === true) {
      setWithdrawModal(true);
    } else {
      alert("동의 버튼을 체크해주시기 바랍니다.");
    }
  };
  const handleCloseWithdraw = () => {
    axios
      .post(`http://localhost:8080/api/members/exit?pw=${withdrawPassword}`)
      .then((response) => {
        console.log(response.data);
        if (response.data.result === true) {
          alert("탈퇴가 완료되었습니다.");
          setWithdrawModal(false);
          window.location.href = "/";
        }
      })
      .catch((response) => {
        alert("오류가 발생하였습니다.");
        setWithdrawModal(false);
      });
  };

  for (let i = 0; i < rank.length; i++) {
    var typeName = "";
    switch (rank[i].type) {
      case 12:
        typeName = "관광지";
        break;

      case 14:
        typeName = "문화시설";
        break;

      case 15:
        typeName = "축제/공연/행사";
        break;

      case 28:
        typeName = "레포츠";
        break;

      case 32:
        typeName = "숙박";
        break;

      case 38:
        typeName = "쇼핑";
        break;

      case 39:
        typeName = "맛집";
        break;

      default:
        break;
    }
    ranklist += typeName;

    if (i !== rank.length - 1) {
      ranklist += ", ";
    }
  }

  const handleClick = (postId) => {
    window.location.href = `/my/${postId}`;
  };

  const handleCloseButton = (e) => {
    e.preventDefault();
    setWithdrawModal(false);
  };

  const handleCurrentPasswordButton = (e) => {
    axios
      .post("http://localhost:8080/api/members/verify/pw", {
        pw: pw,
      })
      .then((res) => {
        console.log(res.data.result);
        if (res.data.result === true) {
          alert("인증 성공했습니다.");
          setModifyPasswordPage(1);
        } else if (res.data.result === false) {
          alert("비밀번호를 다시 입력해주세요.");
        }
      });
  };

  const handlePasswordButton = (e) => {
    axios
      .post("http://localhost:8080/api/members/change/pw", {
        pw: password,
      })
      .then((res) => console.log(res), alert("비밀번호가 변경되었습니다."));
  };

  const Posts = ({ posts, loading, handleClick }) => {
    return <>{loading ? "" : <ShowData />}</>;
  };

  function ShowData() {
    if (currentPage !== 1) {
      return (
        <>
          <ul>
            <table className="table_board">
              <tr className="table-head">
                <th>일정 제목</th> <th>마감날짜</th> <th>인원 수</th>{" "}
                <th>일정 날짜</th>
              </tr>
              <td>
                {posts.map((post, index) => (
                  <div>
                    <li
                      key={postNumber[index]}
                      onClick={() => handleClick(postNumber[index])}
                      className="list-key"
                    >
                      <table>
                        <td>
                          <div style={{ marginLeft: "-12px" }}>
                            {post.title}
                          </div>
                        </td>
                      </table>
                      <hr />
                    </li>
                  </div>
                ))}
              </td>

              <td>
                {posts.map((post, index) => (
                  <div>
                    <li
                      key={currentNumber * 10 + index}
                      onClick={() => handleClick(currentNumber * 10 + index)}
                      className="list-key"
                    >
                      <table>
                        <td>
                          <div>{post.startingDate}</div>
                        </td>
                      </table>
                      <hr />
                    </li>
                  </div>
                ))}
              </td>
            </table>
          </ul>
        </>
      );
    }
  }
  const renderProfilePage = () => {
    return (
      <div className="profile-card">
        <h2>내 정보</h2>
        <hr />
        <h5>이름 : {name}</h5>
        <h5>성별 : {gender} </h5>
        <h5>이메일 : {email}</h5>
        <h5>선호태그 : {ranklist} </h5>
        <hr />
        <h4>평점 : NaN점</h4>
      </div>
    );
  };

  const renderBeforeAccountPage = () => {
    return (
      <div className="profile-card">
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="before-account">
          <h4>정보 수정을 위해 본인을 인증해주세요.</h4>
          <Form>
            <Form.Group controlId="Password">
              <Form.Label>현재 비밀번호</Form.Label>
              <Form.Control
                style={{ width: "400px" }}
                type="text"
                onChange={(e) => setPw(e.target.value)}
              />
            </Form.Group>
          </Form>
          <Button
            style={{
              border: "none",
              backgroundColor: "skyblue",
              width: "100px",
            }}
            variant="primary"
            type="text"
            onClick={handleCurrentPasswordButton}
          >
            인증하기
          </Button>
        </div>
      </div>
    );
  };

  const renderAccountPage = () => {
    return (
      <div className="profile-card">
        <h2>정보 수정</h2>
        <hr />
        <br />
        <h4>비밀번호 변경</h4>
        <Form>
          <Form.Group controlId="Password">
            <table>
              <td>
                <Form.Label>새 비밀번호</Form.Label>
              </td>
              <td style={{ padding: "20px" }}>
                <Form.Control
                  style={{ width: "400px" }}
                  type="text"
                  onChange={handlePassword}
                />
              </td>
            </table>
          </Form.Group>
          <Form.Group controlId="Password">
            <table>
              <td>
                <Form.Label>비밀번호 확인</Form.Label>
              </td>
              <td style={{ padding: "20px" }}>
                <Form.Control
                  style={{ width: "385px" }}
                  type="text"
                  onChange={handleConfirmPasswordChange}
                />
              </td>
            </table>
          </Form.Group>
          <div style={{ marginLeft: "13%" }}>
            {confirmPassword === ""
              ? ""
              : correct === true
              ? "비밀번호 일치"
              : "비밀번호 불일치"}
          </div>
          <Button
            style={{
              border: "none",
              backgroundColor: "skyblue",
              width: "100px",
              marginLeft: "80%",
              marginTop: "-14.5%",
            }}
            variant="primary"
            type="submit"
            onClick={handlePasswordButton}
          >
            변경하기
          </Button>
        </Form>
        <hr />
        <br />
        <table>
          <td>
            <h4>선호태그 변경</h4>
          </td>
          <td>
            <Button
              style={{
                border: "none",
                backgroundColor: "skyblue",
                width: "200px",
                height: "35px",
                marginLeft: "50%",
              }}
              onClick={handleNestedModal}
            >
              태그 변경
            </Button>
            {nestedModal && (
              <Modal show={handleNestedModal} onHide={handleCloseNested}>
                <Modal.Header closeButton>
                  <Modal.Title>태그</Modal.Title>
                  <Modal.Body>변경 전 태그는 {ranklist} 입니다. </Modal.Body>
                </Modal.Header>
                <Modal.Body>
                  <Button1 />
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleCloseNested}
                  >
                    확인
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
          </td>
        </table>
      </div>
    );
  };

  const NullSchedulePage = () => {
    return (
      <div>
        <h5>{name}님의 여행 정보를 찾을 수 없습니다.</h5>
        <h6>
          동행자를 모집하여 직접 여행 일정을 작성하거나, 다른 사람이 만든 여행
          일정에 참여해보세요!
        </h6>
        <br />
        <br />
        <button>일정 생성</button>
      </div>
    );
  };

  const renderSchedulePage = () => {
    return (
      <div className="profile-card">
        <h2>내 일정 조회</h2>
        <select className="select" value={order} onChange={handleSelectOrder}>
          <option default>최신 순</option>
          <option value="좋아요">좋아요 순</option>
          <option value="조회수">조회 수</option>
        </select>
        <hr />
        <table className="table">
          <tbody>
            {size === 0 ? (
              <NullSchedulePage />
            ) : (
              <Posts
                posts={currentPosts(posts)}
                loading={loading}
                handleClick={handleClick}
              ></Posts>
            )}
          </tbody>
        </table>
        {size === 0 ? (
          ""
        ) : (
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={(pageNumber) => setCurrentNumber(pageNumber - 1)}
            total={total}
          ></Pagination>
        )}
        <div>
          <br />
          <table>
            <td>
              {size === 0 ? (
                ""
              ) : (
                <Form.Control
                  type="text"
                  style={{ marginLeft: "10%", width: "400px" }}
                  onClick={handleInputChange}
                  placeholder="검색어를 입력하세요."
                />
              )}
            </td>
            <td>
              {size === 0 ? (
                ""
              ) : (
                <Button style={{ marginTop: "-5px" }}>검색</Button>
              )}
            </td>
          </table>
        </div>
      </div>
    );
  };

  const renderWithdrawPage = () => {
    return (
      <div className="profile-card">
        <h2>회원 탈퇴 안내</h2>
        <hr />
        <h6>회원탈퇴를 신청하기 전 안내 사항을 확인해주세요.</h6>
        <br />
        <h5>
          사용하고 계신 아이디({email})는 탈퇴할 경우 재사용을 하거나 복구가
          불가능합니다.
        </h5>
        <h6>
          탈퇴한 아이디는 본인 및 타인이 더 이상 사용할 수 없는 점을 감안하여
          신중하게 선택하시길 바랍니다.
        </h6>
        <br />
        <h5>탈퇴 후 회원정보 및 서비스 이용기록은 모두 삭제됩니다.</h5>
        <br />
        <br />
        <table>
          <td>
            <input type="checkbox" onClick={handleToggle} />
          </td>
          <td>
            <h6>안내사항을 숙지하였으며, 이에 동의합니다.</h6>
          </td>
        </table>
        <Button
          style={{ backgroundColor: "skyblue", border: "none" }}
          onClick={handleWithdrawModal}
        >
          탈퇴하기
        </Button>
        {withdrawModal && (
          <Modal show={handleWithdrawModal} onHide={handleCloseWithdraw}>
            <Modal.Header closeButton onClick={handleCloseButton}>
              <Modal.Title>비밀번호 입력</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h6>서비스 이용시 사용하였던 비밀번호를 입력해주세요.</h6>
            </Modal.Body>
            <Modal.Body>
              <Form>
                <Form.Control
                  type="text"
                  placeholder="비밀번호를 입력해주세요."
                  onChange={handleWithdrawPassword}
                />
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" onClick={handleCloseWithdraw}>
                탈퇴하기
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    );
  };

  const [modifyPasswordPage, setModifyPasswordPage] = useState(0);

  let currentPageComponent;
  if (currentPage === "profile") {
    currentPageComponent = renderProfilePage();
  } else if (currentPage === "account" && modifyPasswordPage === 0) {
    currentPageComponent = renderBeforeAccountPage();
  } else if (currentPage === "account" && modifyPasswordPage === 1) {
    currentPageComponent = renderAccountPage();
  } else if (currentPage === "withdraw") {
    currentPageComponent = renderWithdrawPage();
  } else if (currentPage === "schedule") {
    currentPageComponent = renderSchedulePage();
  }

  return (
    <div>
      <Navbar />
      <div className="table_n">
        <table>
          <td>
            <div className="content">{currentPageComponent}</div>
          </td>
          <td>
            <div className="contain">
              <div className="menu-card">
                <button
                  className={`buttonstyle ${
                    currentPage === "profile" ? "active" : ""
                  }`}
                  onClick={() => handlePageChange("profile")}
                >
                  프로필
                </button>
                <hr />
                <button
                  className={`buttonstyle ${
                    currentPage === "account" ? "active" : ""
                  }`}
                  onClick={() => handlePageChange("account")}
                >
                  정보 수정
                </button>
                <hr />
                <button
                  className={`buttonstyle ${
                    currentPage === "schedule" ? "active" : ""
                  }`}
                  onClick={() => handlePageChange("schedule")}
                >
                  일정 조회
                </button>
                <hr />
                <button
                  className={`buttonstyle ${
                    currentPage === "schedule" ? "active" : ""
                  }`}
                  onClick={() => handlePageChange("withdraw")}
                >
                  회원 탈퇴
                </button>
              </div>
            </div>
          </td>
        </table>
      </div>
    </div>
  );
}

export default MyPage;
