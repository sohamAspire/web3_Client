import Pagination from "react-js-pagination";
import { useState } from "react";

const Paginator = (props) => {

  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = props.postsPerPage;
  const totalRecords = props.totalPosts;
  const pageRange = 3;
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    props.onChangepage(pageNumber);
    window.scrollTo(0, 0);
  };
  return (
    <div>
      <div className="page-pagination">
        <Pagination
          prevPageText="Prev"
          nextPageText="Next"
          itemClass="Paginator-Link"
          activePage={currentPage}
          itemsCountPerPage={recordPerPage}
          totalItemsCount={totalRecords}
          pageRangeDisplayed={pageRange}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};
export default Paginator;
