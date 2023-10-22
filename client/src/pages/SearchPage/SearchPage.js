import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../util/Pagination";
import "./SearchPage.css";
import find from "../../Image/돋보기.png";
import Navbar from "../../components/Navbar/Navbar"
import { useLocation } from "react-router-dom";
axios.defaults.withCredentials = true;

function SearchPage() {
  let token = localStorage.getItem("token");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const key = searchParams.get("keyword");

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [total, setTotal] = useState(13);
  const [keyword, setKeyword] = useState(null); //Navbar 검색창
  const [localKeyword, setLocalKeyword] = useState(""); //SearchPage 검색창
  var [currentNumber, setCurrentNumber] = useState(0);
  const [order, setOrder] = useState("new");
  const [totalPage, setTotalPage] = useState(0);
  const [postNumber, setPostNumber] = useState([]);

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
  }, []);

  useEffect(() => {
    let encodedKey;
    if (/[\u0080-\uFFFF]/.test(key)) {
      encodedKey = encodeURIComponent(key);
    } else {
      encodedKey = key;
    }
    setKeyword(encodedKey);
    
    const fetchData = async () => {
      setLoading(true);
      const response = await axios.get(
        `/api/trip/tripList?page=${currentNumber}&sortType=${order}&keyWord=${encodedKey}`,
        {
          headers: {'Authorization': `Bearer ${token}`},
          withCredentials: true,
        }
      );
      console.log(response.data);
      console.log(response.data.content);
      setPosts(response.data.content);
      setTotal(response.data.totalElements);
      setTotalPage(response.data.totalPages);
      const postNumberArray = response.data.content.map((post) => post.id);
      setPostNumber(postNumberArray);
      setLoading(false);
    };
    fetchData();
  }, [currentPage, currentNumber, order, key]);
  

  const handleInputChange = (e) => {
    setLocalKeyword(e.target.value);
  };

  const handleSelectOrder = (e) => {
    const value = e.target.value;
    setOrder(value);
  };
  const handleClick = (postId) => {
    window.location.href = `/search/${postId}`;
  };

  function ShowData() {
    if (currentPage !== 1) {
      return (
        <div className="showData">
          <ul className="list">
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
                          <div>{post.title}</div>
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

  const Posts = ({ posts, loading, handleClick }) => {
    return <>{loading ? "" : <ShowData />}</>;
  };

  return (
    <div>
      <Navbar />
      <div className="profile-Card">
        <br />
        <h4>전체 일정 조회</h4>
        <select className="select" value={order} onChange={handleSelectOrder}>
          <option default value="new">
            최신 순
          </option>
          <option value="good">좋아요 순</option>
          <option value="count">조회 수</option>
        </select>
        <hr />
        <table className="table">
          <tbody>
            {size === 0 ? (
              ""
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
      </div>
        {size === 0 ? (
          ""
        ) : (
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={(pageNumber) => setCurrentPage(pageNumber - 1)}
            total={total}
          ></Pagination>
        )}
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

export default SearchPage;
