import React from "react";
import {PageUl, PageLi, PageSpan} from '../style/StyleComponent'


export const Pagination = ({ postsPerPage, totalPosts, paginate, total }) => {
  const pageNumbers = [];
  var t = total;
  for (let i = 1; i <= t / 10 + 1 ; i++) {
    pageNumbers.push(i);
  }

  return (
    <div style={{ marginLeft: "30%", marginTop: "7%" }}>
      <nav>
        <PageUl className="pagination">
          {pageNumbers.map((number) => (
            <PageLi key={number} className="page-item">
              <PageSpan onClick={() => paginate(number)} className="page-link">
                {number}
              </PageSpan>
            </PageLi>
          ))}
        </PageUl>
      </nav>
    </div>
  );
};

export default Pagination;
