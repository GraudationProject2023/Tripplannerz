import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
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

  return (
    <div>
      <h5>시작날짜: {post.startingDate}</h5>
      <h5>기간: {post.period}</h5>
      <h5>내용: {post.content}</h5>
    </div>
  );
}

export default SearchResultPage;