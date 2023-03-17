import React, { useCallback } from "react";
import propTypes from "prop-types";

const Pagination = ({ currentPage, numberOfPages, onClick, limit }) => {
  const currentGroup = Math.ceil(currentPage / limit);
  const lastGroup = Math.ceil(numberOfPages / limit);
  const startPage = (currentGroup - 1) * limit + 1;
  const numberOfPagesInCurrentGroup =
    currentGroup === lastGroup ? numberOfPages % limit : limit;

  const onClickPageNumber = useCallback(
    (pageNumber) => () => {
      onClick(pageNumber);
    },
    [onClick]
  );

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        {currentGroup > 1 && (
          <li className="page-item">
            <div
              className="page-link cursor-pointer"
              onClick={onClickPageNumber(startPage - limit)}
            >
              Previous
            </div>
          </li>
        )}
        {Array(numberOfPagesInCurrentGroup)
          .fill(startPage)
          .map((v, i) => v + i)
          .map((pageNumber) => {
            return (
              <li
                key={pageNumber}
                className={`page-item ${
                  currentPage === pageNumber && "active"
                }`}
              >
                <div
                  className="page-link cursor-pointer"
                  onClick={onClickPageNumber(pageNumber)}
                >
                  {pageNumber}
                </div>
              </li>
            );
          })}
        {currentGroup !== lastGroup && (
          <li className="page-item">
            <div
              className="page-link cursor-pointer"
              onClick={onClickPageNumber(startPage + limit)}
            >
              Next
            </div>
          </li>
        )}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: propTypes.number,
  numberOfPages: propTypes.number.isRequired,
  onClick: propTypes.func.isRequired,
  limit: propTypes.number,
};

Pagination.defaultProps = {
  currentPage: 1,
  limit: 5,
};

export default Pagination;
