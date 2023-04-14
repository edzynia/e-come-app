import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

type PaginationProps = { currentPage: number; onChangePage: any };

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onChangePage,
}) => {
  const handleClick = (event: any) => {
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
      // renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
