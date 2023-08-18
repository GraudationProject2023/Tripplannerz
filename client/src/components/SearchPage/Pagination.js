import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const PageUl = styled.ul`
  display: absolute;
  flex-direction: row;
  float: center;
  list-style: none;
  text-align: center;
  border-radius: 3px;
  color: white;
  padding: 0px;
`;

const PageLi = styled.li`
  display: inline-block;
  font-size: 17px;
  font-weight: 600;
  padding: 0px;
  border-radius: 5px;
  width: 35px;
  &:hover {
    cursor: pointer;
    color: white;
    background-color: #000000;
  }
  &:focus {
    color: white;
    background-color: #000000;
  }
`;

const PageSpan = styled.span`
  &:hover::after,
  &:focus::after {
    border-radius: 100%;
    color: white;
    background-color: #263a6c;
  }
`;

const ArrowButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  font-weight: 600;
  padding: 5px;
  border-radius: 5px;
  width: 25px;
  &:hover {
    cursor: pointer;
    color: white;
    background-color: #263a6c;
  }
  &:focus {
    color: white;
    background-color: #263a6c;
  }
`;

const Pagination = ({ postsPerPage, totalPosts, paginate, total }) => {
  const pageNumbers = [];
  var t = total;
  for (let i = 1; i <= t / 10 + 1 ; i++) {
    pageNumbers.push(i);
  }

  return (
    <div style={{ marginLeft: "30%", marginTop: "7%" }}>
      <nav>
        {/*<ArrowButton>&#8249;</ArrowButton>*/}
        <PageUl className="pagination">
          {pageNumbers.map((number) => (
            <PageLi key={number} className="page-item">
              <PageSpan onClick={() => paginate(number)} className="page-link">
                {number}
              </PageSpan>
            </PageLi>
          ))}
        </PageUl>
        {/*<ArrowButton>&#8250;</ArrowButton>*/}
      </nav>
    </div>
  );
};

export default Pagination;
