import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
  } from "../ui/Pagination";
  import { generatePaginationLinks } from "./generatePaginationLinks";
  
  type PaginatorProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
  };
  
  export default function Paginator({
    currentPage,
    totalPages,
    onPageChange,
  }: PaginatorProps) {
    return (
      <Pagination>
        <PaginationContent>
          {totalPages ? (
            <PaginationItem>
              <PaginationPrevious
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage - 1 < 1}
              />
            </PaginationItem>
          ) : null}
          {generatePaginationLinks(currentPage, totalPages, onPageChange)}
          {totalPages ? (
            <PaginationItem>
              <PaginationNext
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage > totalPages - 1}
              />
            </PaginationItem>
          ) : null}
        </PaginationContent>
      </Pagination>
    );
  }