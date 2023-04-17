import React from "react";
import {
  MDBPagination,
  MDBBtn,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";
const Pagination = ({ data, postPerPage, paginate }) => {
  // console.log(data);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / postPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <nav aria-label="...">
        <MDBPagination className="mb-0 d-flex justify-content-center text-dark ">
          {pageNumbers.map((number) => (
            <MDBPaginationItem key={number} className="text-info p-0">
              <MDBPaginationLink className="p-0">
                <MDBBtn outline onClick={() => paginate(number)}>
                  {number}
                </MDBBtn>
              </MDBPaginationLink>
            </MDBPaginationItem>
          ))}
        </MDBPagination>
      </nav>
    </>
  );
};

export default Pagination;
