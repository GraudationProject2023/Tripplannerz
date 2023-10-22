import React, { useState, useEffect } from "react";
import { Form, Button, Modal, Card } from "react-bootstrap";
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Pagination from "../../util/Pagination";
import { SelectPreference } from "../../util/SelectPreference";
import "./MyPage.css";
import find from "../../Image/돋보기.png";
import axios from "axios";
axios.default.withCredentials = true;

function MyPage() {
  let token = localStorage.getItem("token");
  
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

  const [accompanyList, setAccompanyList] = useState(["1","2","3","4","5"]) // 동행 신청 현황

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
    axios.get("/api/members/tripInfo", 
     {
      headers:{'Authorization': `Bearer ${token}` },
     }).then((response) => {
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
        `/api/members/tripList?page=${currentNumber}&sortType=${order}`,
        {
          headers: {'Authorization': `Bearer ${token}`},
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
        `/api/trip/search?page=${currentNumber}&sortType=${order}&keyWord=${keyword}`,
        {
          headers: {'Authorization': `Bearer ${token}`},
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

  const handleCloseNested = () => {
    var res = localStorage.getItem("rank");
    if (res === "-1") {
      alert("태그를 최소 1개 이상 선택하셔야 합니다.");
    } else {
      var ranks = localStorage.getItem("rank");
      console.log(ranks);

      const postToServer = {
        types: rank
      }

      axios
        .post("/api/members/change/types", postToServer, {
          headers: {'Authorization': `Bearer ${token}`},
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
    const postToServer = {
      pw: withdrawPassword
    }

    axios
      .post("/api/members/exit", postToServer,{
        headers: {'Authorization': `Bearer ${token}`}
      })
      .then((response) => {
        console.log("비번: ",response.data.result);
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
    window.location.href = `/search/${postId}`;
  };

  const handleCloseButton = (e) => {
    e.preventDefault();
    setWithdrawModal(false);
  };

  const handleCurrentPasswordButton = (e) => {

    const postToServer = {
      pw: pw
    }

    axios
      .post("/api/members/verify/pw", postToServer,{
        headers: {'Authorization': `Bearer ${token}`},
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

    const postToServer = {
      pw: password
    }

    axios
      .post("/api/members/change/pw", postToServer,
      { 
        headers: {'Authorization': `Bearer ${token}`}
      }
      ).then((res) => console.log(res), alert("비밀번호가 변경되었습니다."));
  };

  const Posts = ({ posts, loading, handleClick }) => {
    return <>{loading ? "" : <ShowData />}</>;
  };

  function ShowData() {
    if (currentPage !== 1) {
      return (
        <div className="showData">
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
                      key={postNumber[index]}
                      onClick={() => handleClick(postNumber[index])}
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
                          <div>{post.startingDate}</div>
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
                      key={postNumber[index]}
                      onClick={() => handleClick(postNumber[index])}
                      className="list-key"
                    >
                      <table>
                        <td>
                          <div>{post.comingDate}</div>
                        </td>
                      </table>
                      <hr />
                    </li>
                  </div>
                ))}
              </td>
            </table>
          </ul>
        </div>
      );
    }
  }
  const renderProfilePage = () => {
    return (
      <div className="profilecard">
        <h2>내 정보</h2>
        <hr />
        <h5>이름 : {name}</h5>
        <h5>성별 : {gender} </h5>
        <h5>이메일 : {email}</h5>
        <h5>선호태그 : {ranklist} </h5>
        <hr />
        <h4>동행 신청 현황</h4>
          {accompanyList.map((item,idx) => 
            <Card key={idx} style={{
              height: '100px'
            }} >
              <h6>여행 일정 :</h6>
              <h6>신청자 : </h6> 
              <h6>신청 내용 : {item.length <= 50 ? item : item.slice(0,50) + '...'}</h6>
              <table>
                <td><Button
                onClick={(e) => {
                  const updateList = accompanyList.filter((listItem) => listItem !== item)
                  setAccompanyList(updateList);
                }}
                style={{
                  marginTop: '-15%',
                  marginLeft: '170%',
                  width: '40px',
                  height: '40px'
                }}
              >O</Button></td>
                <td>
                  <Button  onClick= {(e) => {
                  const updateList = accompanyList.filter((listItem) => listItem !== item)
                  setAccompanyList(updateList);
                  }} 
                  style={{marginTop: '-15%', marginLeft: '85%',width: '40px', height: '40px'}}>
                    X
                  </Button>
                </td>
              </table>
              
            </Card>
          )}
        </div>
    );
  };

  const renderBeforeAccountPage = () => {
    return (
      <div className="profilecard">
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
      <div className="profilecard">
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
                  <SelectPreference />
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
      <div className="profilecard">
        <h2>내 일정 조회</h2>
        <select className="select" value={order} onChange={handleSelectOrder}>
          <option default value="new">최신 순</option>
          <option value="good">좋아요 순</option>
          <option value="count">조회 수</option>
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
        <div>
        {size === 0 ? (
          ""
        ) : (
          <div className="searchText">
            <table>
              <td>
                <input
                  type="text"
                  onChange={handleInputChange}
                  placeholder="검색어를 입력하세요"
                />
              </td>
              <td>
                <img src={find} />
              </td>
            </table>
          </div>
        )}
        </div>
        <br />
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
      </div>
    );
  };

  const renderWithdrawPage = () => {
    return (
      <div className="profilecard">
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
      <br />
      <Footer />
    </div>
  );
}

export default MyPage;
