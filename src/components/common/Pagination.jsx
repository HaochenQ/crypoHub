import React from "react";
import _ from "lodash";
import propTypes from "prop-types";

/**
 * Pagination component takes four propos
 * ItemCount:the number of total items
 * pageSize: the number of items for each page
 * onPageChange: function for page change
 * currentPage: current page number
 */
const Pagination = (props) => {
  const { ItemCount, pageSize, onPageChange, currentPage } = props;
  const pageCount = ItemCount / pageSize;
  const pages = _.range(1, pageCount + 1);
  if (Math.ceil(pageCount) === 1) {
    return null;
  }

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination pagination-sm">
        {pages.map((page) => (
          <li
            className={page === currentPage ? "page-item active" : "page-item"}
            key={page}
          >
            <a
              className="page-link"
              onClick={() => onPageChange(page)}
              href="#!"
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
Pagination.propTypes = {
  ItemCount: propTypes.number.isRequired,
  pageSize: propTypes.number.isRequired,
  onPageChange: propTypes.func.isRequired,
  currentPage: propTypes.number.isRequired,
};

export default Pagination;
