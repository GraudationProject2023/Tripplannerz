import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import {Button} from 'react-bootstrap';
import './SearchPage.css';
import Navbar from '../Navbar/Navbar';
import {useLocation} from 'react-router-dom';
axios.defaults.withCredentials = true;


function SearchPage(){

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const key = searchParams.get('keyword');

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [total, setTotal] = useState(13);
    const [keyword, setKeyword] = useState('');//Navbar 검색창
    const [localKeyword, setLocalKeyword] = useState(''); //SearchPage 검색창
    var [currentNumber, setCurrentNumber] = useState(0);
    const [order, setOrder] = useState("기본");
    const [totalPage, setTotalPage] = useState(0);
    const [postNumber,setPostNumber] = useState([]);

    var size = posts.length;
    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const currentPosts = (posts) => {
              let currentPosts = 0;
              currentPosts = posts.slice(indexOfFirst, indexOfLast);
              return currentPosts;
    };


     useEffect(() => {
                     localStorage.setItem("cast",1);
                     localStorage.setItem("rank",-1);
                     localStorage.setItem("vest",1);
                     document.cookie = 'cookieName=JSESSIONID; expires=THU, 01 Jan 1970 00:00:00 UTC; path=/;'
                },[]);

    useEffect(() => {
         setKeyword(key);
         const fetchData = async() => {
                        setLoading(true);
                        const response = await axios.get(
                            `http://localhost:8080/api/members/trip/tripList?page=${currentNumber}&sortType=${order}&keyWord=${keyword}`,
                            {
                                withCredentials: true
                            }
                        );
                        console.log(response.data);
                        setPosts(response.data.content);
                        setTotal(response.data.totalElements);
                        setTotalPage(response.data.totalPages);
                        for(let i = 0; i <response.data.content.length; i++)
                        {
                            setPostNumber(i);
                        }
                        setLoading(false);
                    };
        fetchData();
    },[currentPage,currentNumber, order, key]);
     useEffect(() => {
             const fetchData = async() => {
                            setLoading(true);
                            const response = await axios.get(
                                `http://localhost:8080/api/members/trip/tripList?page=${currentNumber}&sortType=${order}&keyWord=${localKeyword}`,
                                {
                                    withCredentials: true
                                }
                            );
                            console.log(response.data);
                            setPosts(response.data.content);
                            setTotal(response.data.totalElements);
                            setTotalPage(response.data.totalPages);
                            for(let i = 0; i <response.data.content.length; i++)
                            {
                                setPostNumber(i);
                            }
                            setLoading(false);
                        };
            fetchData();
     },[currentPage,currentNumber, order, localKeyword]);

    const handleInputChange = (e) => {
        setLocalKeyword(e.target.value);
    };

    const handleSelectOrder = (e) => {
        const value = e.target.value;
        setOrder(value);
    }
    const handleClick = (postId) => {
        window.location.href = `/search/${postId}`;
    }

    function ShowData(){
                if(currentPage !== 1){
                return(
                <>
                <ul className="list">
                        <table className="table_board">
                                                  <tr className="table-head">
                                                     <th>일정 제목</th> <th>마감날짜</th> <th>인원 수</th> <th>일정 날짜</th>
                                                  </tr>
                                                <td>
                                                    {posts.map((post,index) => (
                                                      <div>
                                                      <li key={currentNumber * 10 + index}  onClick={() => handleClick(currentNumber * 10 + index)} className="list-key">
                                                        <table>
                                                        <td><div style={{marginLeft: "-12px"}}>{post.title}</div></td>
                                                        </table>
                                                        <hr />
                                                      </li>
                                                      </div>
                                                    ))}
                                                </td>

                                                  <td>
                                                    {posts.map((post,index) => (
                                                         <div>
                                                            <li key={currentNumber * 10 + index}  onClick={() => handleClick(currentNumber * 10 + index)} className="list-key">
                                                                 <table>
                                                                    <td><div>{post.startingDate}</div></td>
                                                                 </table>
                                                            <hr />
                                                            </li>

                                                         </div>
                                                    ))}

                                                  </td>

                                                 </table>
                       </ul>
                </>
                )
            }
    }


   const Posts = ({ posts, loading, handleClick}) => {
     return (
       <>
       {loading ? '': <ShowData />}
     </>
   );
 };

    return(
    <div>
      <Navbar />
      <div className = "profile-card">
        <br />
         <h4>전체 일정 조회</h4>
         <select className = "select" value={order} onChange={handleSelectOrder}>            <option default>최신 순</option>
            <option value="좋아요">좋아요 순</option>
            <option value="조회수">조회 수</option>
            </select>
          <hr />
        <table className="table">
         <tbody>
         {size === 0 ? '' : <Posts posts={currentPosts(posts)} loading={loading} handleClick={handleClick}></Posts>}
          </tbody>
       </table>
       {size === 0 ? '' :
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={(pageNumber) => setCurrentPage(pageNumber-1)}
            total={total}
          ></Pagination>}
    </div>
    <div>
    { size === 0 ? '' : <div className="searchText">
                           <table>
                              <td>
                                <input type="text" onClick={handleInputChange} placeholder="검색어를 입력하세요"/>
                              </td>
                              <td>
                                <Button>검색</Button>
                              </td>
                           </table>
                     </div>}
    </div>
    </div>
    )
}

export default SearchPage;
