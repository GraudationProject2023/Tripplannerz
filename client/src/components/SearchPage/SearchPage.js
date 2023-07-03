
import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import {Button} from 'react-bootstrap';
import './SearchPage.css';
import Navbar from '../Navbar/Navbar';
axios.defaults.withCredentials = true;


function SearchPage(){

    const [data, setData] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [total, setTotal] = useState(13);

     useEffect(() => {
                     localStorage.setItem("cast",1);
                     localStorage.setItem("rank",-1);
                     localStorage.setItem("vest",1);
                     document.cookie = 'cookieName=JSESSIONID; expires=THU, 01 Jan 1970 00:00:00 UTC; path=/;'
                },[]);

    useEffect(() => {
        console.log(currentPage);
         const fetchData = async() => {
                        setLoading(true);
                        const response = await axios.get(
                            `http://localhost:8080/api/members/trip?page=${currentPage}`,
                            {
                                withCredentials: true
                            }
                        );
                        console.log(response.data);
                        setPosts(response.data.result);
                        setTotal(response.data.total);
                        setLoading(false);
                    };
        fetchData();
    },[currentPage]);

    function ShowData(){
                if(currentPage !== 1){
                return(
                <>
                <ul className="list">
                        {posts.map((post) => (
                          <div>
                          <li key={post.id} style={{border:"1px solid black"}} onClick={() => handleClick(post.id)} className="listkey">
                            <table>
                            <td><div>{post.title}</div></td>
                            <td><div>{post.startingDate}</div></td>
                            </table>
                          </li>

                          </div>
                        ))}
                       </ul>
                </>
                )
            }
    }

        const indexOfLast = currentPage * postsPerPage;
        const indexOfFirst = indexOfLast - postsPerPage;
        const currentPosts = (posts) => {
          let currentPosts = 0;
          currentPosts = posts.slice(indexOfFirst, indexOfLast);
          return currentPosts;
        };

     const fetchData = async(pageNum) => {
                          try{
                            const response = await axios.get('http://localhost:8080/api/members/trip?page=${currentpage}',
                            {
                              withCredentials: true
                            }
                            );
                            const data = response.data;
                            console.log(data);

                          } catch(error){
                            console.error(error);
            }
         }


   const Posts = ({ posts, loading, handleClick}) => {
     return (
       <>
       {loading ? '': <ShowData />}
       <ul className="list">
        {posts.map((post) => (
          <div>
          <li key={post.id} style={{border:"1px solid black"}} onClick={() => handleClick(post.id)} className="listkey">
            <table>
            <tr onClick={()=>handleClick(post.id)}>
            <td><div>{post.title}</div></td>
             <td><div>{post.startingDate}</div></td>
            </tr>
            </table>
          </li>

          </div>
        ))}
       </ul>
     </>
   );
 };
    const handleClick = (postId) => {
        window.location.href = `/search/${postId}`;
    }

    return(
    <div>
      <Navbar />
      <div className = "start">
            <h4>내 일정 보기</h4>
            </div>

    <div className="container">
     <div className="table-container">
      <table className="table">
         <thead className="table-head">
            <tr>
              <th>일정 제목</th>
              <th>인원 수 &nbsp;</th>
              <th>일정 날짜 &nbsp;</th>
            </tr>
         </thead>
         <tbody>
          <Posts posts={currentPosts(posts)} loading={loading} handleClick={handleClick}></Posts>
          </tbody>
       </table>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={(pageNumber) => setCurrentPage(pageNumber)}
            total={total}
          ></Pagination>
       </div>


        {console.log(total)}

    </div>
      <div className="searchText">
                  <table>
                  <td>
                     <input type="text" placeholder="검색어를 입력하세요"/>
                  </td>
                  <td>
                     <Button>검색</Button>
                  </td>
                  </table>
                </div>
    </div>
    )
}

export default SearchPage;
