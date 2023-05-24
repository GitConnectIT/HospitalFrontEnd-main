import React from "react";
import {
  Pagination as RBPagination,
  PaginationProps,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

export interface PaginationControlProps extends PaginationProps {
  page?: number;
  between?: number;
  total: number;
  limit: number;
  changePage?: (page: number) => any;
  next?: boolean;
  last?: boolean;
  ellipsis?: number;
}

export const PaginationControl = ({
  page = 1,
  between = 3,
  total,
  limit,
  changePage = (page) => console.log(page),
  next = true,
  last = false,
  ellipsis = 0,
  ...paginationProps
}: PaginationControlProps) => {
  const total_pages = Math.ceil(total / limit);
  between = between < 1 ? 1 : between;
  page = page < 1 ? 1 : page > total_pages ? total_pages : page;
  ellipsis =
    ellipsis < 1 ? 0 : ellipsis + 2 >= between ? between - 2 : ellipsis;

  let positions = Array.from({ length: total_pages }, (_, i) => i);

  const qtd_pages = between * 2 + 1;
  const range =
    total_pages <= qtd_pages
      ? // Show active without slice
        positions
      : page - 1 <= between
      ? // Show active in left
        positions.slice(0, qtd_pages - (ellipsis > 0 ? ellipsis + 1 : 0))
      : page + between >= total_pages
      ? // Show active in right
        positions.slice(
          total_pages - qtd_pages + (ellipsis > 0 ? ellipsis + 1 : 0),
          total_pages
        )
      : // Show active in middle
        positions.slice(
          page - 1 - (between - (ellipsis > 0 ? ellipsis + 1 : 0)),
          page + (between - (ellipsis > 0 ? ellipsis + 1 : 0))
        );

  return total !== null && total > 0 ? (
    <RBPagination {...paginationProps} className="mb-0">
      {last && (
        <PaginationItem
          onClick={() => (page > 1 ? changePage(1) : {})}
          disabled={page <= 1}
        >
          <PaginationLink first />
        </PaginationItem>
      )}
      {next && (
        <PaginationItem>
          <PaginationLink
            previous
            onClick={() => (page > 1 ? changePage(page - 1) : {})}
            disabled={page <= 1}
          />
        </PaginationItem>
      )}
      {total_pages > between * 2 + 1 &&
        ellipsis > 0 &&
        positions.slice(0, page - 1 <= between ? 0 : ellipsis).map((value) => {
          return (
            <PaginationItem>
              <PaginationLink
                key={value}
                onClick={() =>
                  value !== page - 1 ? changePage(value + 1) : {}
                }
              >
                {value + 1}
              </PaginationLink>
            </PaginationItem>
          );
        })}
      {
        // Show ellipsis when "page" is bigger than "between"
        total_pages > between * 2 + 1 && ellipsis > 0 && page - 1 > between && (
          <PaginationItem>
            <PaginationLink disabled>...</PaginationLink>
          </PaginationItem>
        )
      }
      {range.map((value) => {
        return (
          <PaginationItem>
            <PaginationLink
              className={`${value === page - 1 ? "active" : ""}`}
              key={value}
              onClick={() => (value !== page - 1 ? changePage(value + 1) : {})}
            >
              {value + 1}
            </PaginationLink>
          </PaginationItem>
        );
      })}
      {
        // Show ellipsis when "page" is lower than "between"
        total_pages > between * 2 + 1 &&
          ellipsis > 0 &&
          page < total_pages - between && (
            <PaginationItem>
              <PaginationLink disabled>...</PaginationLink>
            </PaginationItem>
          )
      }
      {total_pages > between * 2 + 1 &&
        ellipsis > 0 &&
        positions
          .slice(
            page >= total_pages - between
              ? total_pages
              : total_pages - ellipsis,
            total_pages
          )
          .map((value) => {
            return (
              <PaginationItem>
                <PaginationLink
                  key={value}
                  onClick={() =>
                    value !== page - 1 ? changePage(value + 1) : {}
                  }
                >
                  {value + 1}
                </PaginationLink>
              </PaginationItem>
            );
          })}
      {next && (
        <PaginationItem>
          <PaginationLink
            next
            onClick={() => (page < total_pages ? changePage(page + 1) : {})}
            disabled={page >= total_pages}
          />
        </PaginationItem>
      )}
      {last && (
        <PaginationItem>
          <PaginationLink
            last
            onClick={() => (page < total_pages ? changePage(total_pages) : {})}
            disabled={page >= total_pages}
          />
        </PaginationItem>
      )}
    </RBPagination>
  ) : (
    <></>
  );
};
