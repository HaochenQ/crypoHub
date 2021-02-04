import React, { Component } from "react";
import Table from "./common/Table";

class MoviesTable extends Component {
  //table column
  columns = [
    { label: "Coin", path: "Coin" },
    { label: "Price", path: "Price" },
    { label: "24h", path: "Difference_24h" },
    { label: "7d", path: "Difference_7d" },
    { label: "30d", path: "Difference_30d" },
    { label: "Volume", path: "Volume_24h" },
    { label: "Market Cap", path: "MarketCap" },
  ];

  render() {
    const { crypoData, sortColumn, onSort } = this.props;
    return (
      <Table
        data={crypoData}
        columns={this.columns}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }
}

export default MoviesTable;
