import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {Button, Form} from 'react-bootstrap';
axios.default.withCredentials = true;

function SearchResultPage(props) {
  const {postId} = useParams();
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/members/trip/result?id=${postId}`,
          {
            withCredentials: true,
          }
        );
        const postData = response.data;
        setPost(postData);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [postId]);

    //댓글 평점
    const [Review, setReview] = useState("")
    const [Grade, setGrade] = useState([false,false,false,false,false])

    const reviewChangeHandler = (event) => {
        setReview(event.currentTarget.value)
    }

    const gradeChangeHandler = (event) => {
        let gradeStates = [...Grade];

        for(let i =0; i < 5; i++)
        {
            //gradeStates[i] = i <= index ? true : false;
        }

        setGrade(gradeStates);
    }

    const setStar = () => {
        let star = Grade.filter(Boolean).length;
    }

  return (
  <div>
    <div>
      <h5>시작날짜: {post.startingDate}</h5>
      <h5>기간: {post.period}</h5>
      <h5>내용: {post.content}</h5>
    </div>
    <div>
      <h5>댓글</h5>
        <input type="text" onChange = {reviewChangeHandler} />
    </div>
   </div>
  );
}

export default SearchResultPage;