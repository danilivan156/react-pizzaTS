import React from 'react'
import ReactPaginate from 'react-paginate';
import style from './Pagination.module.scss'

type PaginationProps = {
  onChangePage: (target: number) => void,
  currentPage: number
}

const Pagination: React.FC<PaginationProps> = ({onChangePage, currentPage}) => {
  return (
    <ReactPaginate
        className={style.paginate}
        breakLabel="..."
        previousLabel="<"
        nextLabel=">"
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        forcePage={currentPage - 1}
    />
  )
}

export default Pagination
