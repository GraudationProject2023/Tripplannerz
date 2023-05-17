
import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Pagination from './Pagination';
axios.defaults.withCredentials = true;

function SearchPage(){

    const [data, setData] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [postsPerPage, setPostsPerPage] = useState(10);


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
                        setPosts(response.data);
                        setLoading(false);
                    };
        fetchData();
    },[currentPage]);
    function ShowData(){
                if(currentPage !== 1){
                return(
                <ul>
                        {posts.map((post) => (
                          <li key={post.id}><div>일정제목: {post.title}</div></li>
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


   const Posts = ({ posts, loading}) => {
     return (
       <>
       {loading ? <div> loading... </div> : <ShowData />}
       <ul>
        {posts.map((post) => (
          <li key={post.id}><div>일정제목: {post.title}</div></li>
        ))}
       </ul>
     </>
   );
 };


    return(
    <div>
     <div style={{border:"1px solid black",width:"50%",marginLeft:"20%"}}>
      <table>
         <thead>
            <tr>
              <th>팀 이름</th>
              <th>일정 제목 &nbsp;</th>
              <th>인원 수 &nbsp;</th>
              <th>일정 날짜 &nbsp;</th>
            </tr>
         </thead>
         <tbody>
          <Posts posts={currentPosts(posts)} loading={loading}></Posts>
                               <br />
                               <br />
                            <Pagination
                                   postsPerPage={postsPerPage}
                                   totalPosts={posts.length}
                                   paginate={(pageNumber) => setCurrentPage(pageNumber)}
                                 ></Pagination>
         </tbody>
         {/*<tbody>
          {data.map(item => (
           <tr key={item.id}>
             <td>{item.Name}</td>
             <td>{item.Title}</td>
             <td>{item.people}</td>
             <td>{item.Date}</td>
           </tr>
          ))}
          </tbody>*/}
       </table>
       </div>


    </div>
    )
}

export default SearchPage;
