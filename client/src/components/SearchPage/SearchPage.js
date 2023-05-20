
import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import './SearchPage.css';
axios.defaults.withCredentials = true;


function SearchPage(){

    const [data, setData] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [total, setTotal] = useState(13);

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
                <ul>
                        {posts.map((post) => (
                          <li key={post.id}>
                           <table>
                              <td><div>일정제목: {post.title}</div></td>
                              <td><div><button onClick={() => handleClick(post.id)}>클릭</button></div></td>
                           </table>
                          </li>
                        ))}
                      </ul>
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
       <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <table>
            <td><div>{post.title}</div></td>
            <td><div><button onClick={() => handleClick(post.id)}>클릭</button></div></td>
            </table>
          </li>

        ))}
       </ul>
     </>
   );
 };
    const handleClick = (postId) => {
        window.location.href = `/search/${postId}`;
    }

    return(
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


    </div>
    )
}

export default SearchPage;
