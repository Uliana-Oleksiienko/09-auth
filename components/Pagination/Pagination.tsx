"use client";

import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";
import { PAGINATION_CONFIG } from "../../constants";
import { useEffect, useRef } from "react";

interface PaginationProps {
  totalPages: number;
  page: number;
  handlePageChange: (page: number) => void;
}

export default function Pagination({
  totalPages,
  page,
  handlePageChange,
}: PaginationProps) {
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ul = navRef.current?.querySelector("ul");
    if (ul) {
      ul.removeAttribute("role");
      ul.removeAttribute("aria-label");
    }
  }, [totalPages, page]);

  return (
    <nav aria-label="Pagination" ref={navRef}>
      <ReactPaginate
        {...PAGINATION_CONFIG}
        pageCount={totalPages}
        forcePage={page - 1}
        onPageChange={({ selected }) => handlePageChange(selected + 1)}
        containerClassName={css.pagination}
        renderOnZeroPageCount={null}
        activeClassName={css.active}
        disabledClassName={css.disabled}
      />
    </nav>
  );
}