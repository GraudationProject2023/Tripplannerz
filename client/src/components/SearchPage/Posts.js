import React from "react";


const Posts = ({ posts, loading}) => {
  return (
    <>
      {loading && <div> loading... </div>}
      <ul>
        {posts.map((post) => (
          <li key={post.id}><div>일정제목: {post.title}</div></li>
        ))}
      </ul>
    </>
  );
};
export default Posts;
