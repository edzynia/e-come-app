import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

const Pagination = ({ currentPage, onChangePage }) => {
  console.log();

  const handleClick = (event) => {
    onChangePage(event.selected + 1);
    window.scrollTo(0, 0);
  };
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel='...'
      nextLabel=' >'
      previousLabel='< '
      onPageChange={handleClick}
      pageRangeDisplayed={8}
      pageCount={2}
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
