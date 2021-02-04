import React, { useState, useEffect } from "react";
import _ from "lodash";
import DataTable from "./DataTable";
import SearchBox from "./common/SearchBox";
import Pagination from "./common/Pagination";
import { paginate } from "../utils/helper";
import http from "../service/httpService";

const apiEndpoint = "/coins/markets";
/**
 * Home page
 */
const Home = () => {
  const [sortColumn, setSortColumn] = useState({
    path: "MarketCap",
    order: "desc",
  });
  const [searchQuery, setSearchQuery] = useState("");
  //data to be displayed on the home page
  const [crypoData, setCryptoData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  //page size for pagination
  const pageSize = 10;

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await http.get(apiEndpoint);
      const data = await result.data;
      setCryptoData(data);
    } catch (error) {}
  };
  //process crypodata(sort/filter/pagination) before display
  const processData = () => {
    let originalData = crypoData;
    if (searchQuery) {
      //filter
      originalData = originalData.filter((m) =>
        m.Coin.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    //sort
    const sortedData = _.orderBy(
      originalData,
      [sortColumn.path],
      [sortColumn.order]
    );
    //paginate
    const paginated = paginate(sortedData, currentPage, pageSize);
    return { paginated, totalCount: sortedData.length };
  };
  const { paginated: processedData, totalCount } = processData();

  return (
    <div className="page">
      <SearchBox value={searchQuery} onChange={handleSearch} />
      <DataTable
        sortColumn={sortColumn}
        crypoData={processedData}
        onSort={handleSort}
      />
      <Pagination
        ItemCount={totalCount}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Home;
