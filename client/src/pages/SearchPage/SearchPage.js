import React, { useState, useEffect } from "react";
import { Table } from "antd";
import {PageUl, PageLi, PageSpan} from '../../style/StyleComponent'
import axios from "axios";
import "./SearchPage.css";
import Footer from "../../components/Footer/Footer";
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

      
  const fetchData = async () => {
    let encodedKey;
    if (/[\u0080-\uFFFF]/.test(key)) {
      encodedKey = encodeURIComponent(key);
    } else {
      encodedKey = key;
    }
    setKeyword(encodedKey);

    setLoading(true);
    const response = await axios.get(
      `http://localhost:8080/api/trip/tripList?page=${currentNumber}&sortType=${order}&keyWord=${encodedKey}`,
      {
        headers: {'Authorization': `Bearer ${token}`},
        withCredentials: true,
      }
    );
    setPosts(response.data.content);
    setTotal(response.data.totalElements);
    setTotalPage(response.data.totalPages);
    const postNumberArray = response.data.content.map((post) => post.id);
    setPostNumber(postNumberArray);
    setLoading(false);
  };

  const Pagination = ({ totalPage }) => {
    const pageNumbers = Array.from({length: totalPage}, (_, index) => index + 1)

    return (
      <div style={{ marginLeft: "30%", marginTop: "7%" }}>
        <nav>
          <PageUl className="pagination">
            {pageNumbers.map((number) => (
              <PageLi key={number} className="page-item">
                <PageSpan onClick={() => { setCurrentNumber(number-1)}} className="page-link">
                  {number}
                </PageSpan>
              </PageLi>
            ))}
          </PageUl>
        </nav>
      </div>
    );
  };


  useEffect(() => {
    fetchData();
    Pagination({})
  }, [currentPage,currentNumber, order, key]);
  

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

    const columns = [
      {
        title: '일정 제목',
        dataIndex: 'title',
        key: 'title',
        render: (text, record) => (
          <span onClick={() => handleClick(record.key)} className="list-key">
            {text}
          </span>
        ),
      },
      {
        title: '마감날짜',
        dataIndex: 'deadline',
        key: 'deadline',
        render: (text, record) => (
          <span onClick={() => handleClick(record.key)} className="list-key">
            {text}
          </span>
        ),
      },
      {
        title: '인원 수',
        dataIndex: 'participants',
        key: 'participants',
        render: (text, record) => (
          <span onClick={() => handleClick(record.key)} className="list-key">
            {text}
          </span>
        ),
      },
      {
        title: '일정 날짜',
        dataIndex: 'startingDate',
        key: 'startingDate',
        render: (text, record) => (
          <span onClick={() => handleClick(record.key)} className="list-key">
            {text}
          </span>
        ),
      },
    ]

    const data = posts.map((post,index) => ({
      key: postNumber[index],
      title: post.title,
      deadline: post.comingDate,
      participants: post.currentNum.toString() + ' / ' + post.recruitNum.toString(),
      startingDate: post.comingDate + ' ~ ' + post.startingDate,
    }))

    if (currentPage !== 1) {
      return (
        <div className="showData">
          <ul className="list">
            <Table columns={columns} dataSource={data} pagination={false} />
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
          <option value="hits">조회 수</option>
        </select>
        <hr />
        <table className="table">
          <tbody>
            {size === 0 ? (
              ""
            ) : (
              <Posts
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
          <Pagination totalPage={totalPage}/>
        )}
      </div>
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default SearchPage;
