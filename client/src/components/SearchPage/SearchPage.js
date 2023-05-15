import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import Posts from './Posts';

function SearchPage(){

    const [data, setData] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);

    useEffect(() => {
        const fetchData = async() => {
            setLoading(true);
            const response = await axios.get(
                "https://jsonplaceholder.typicode.com/posts"
            );
            setPosts(response.data);
            setLoading(false);
        };
        fetchData();
    },[]);

//    useEffect(() => {
//      axios.get('')
//      .then(response => response.json())
//      .then(data => setData(data));
//    },[]);
       const indexOfLast = currentPage * postsPerPage;
        const indexOfFirst = indexOfLast - postsPerPage;
        const currentPosts = (posts) => {
          let currentPosts = 0;
          currentPosts = posts.slice(indexOfFirst, indexOfLast);
          return currentPosts;
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