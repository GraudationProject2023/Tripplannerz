import React,{useState, useEffect} from 'react';
import axios from 'axios';
function SearchPage(){

    const [data, setData] = useState([]);

    useEffect(() => {
      axios.get('')
      .then(response => response.json())
      .then(data => setData(data));
    },[]);

    return(
    <div>
      <table>
         <thead>
            <tr>
              <th>팀 이름</th>
              <th>일정 제목</th>
              <th>인원 수</th>
              <th>일정 날짜</th>
            </tr>
         </thead>
         <tbody>
          {data.map(item => (
           <tr key={item.id}>
             <td>{item.Name}</td>
             <td>{item.Title}</td>
             <td>{item.people}</td>
             <td>{item.Date}</td>
           </tr>
          ))}
          </tbody>
       <table>
    </div>
    )
}

export default SearchPage;