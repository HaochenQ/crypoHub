import React, { Component } from "react";
import propTypes from "prop-types";
/**
 * table header component takes
 * columns: array of objects{label,path}
 * sortColumn: current column that need to be sort, object.{path, order} order can be "asc" or "desc"
 */
class TableHeader extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };
  render() {
    return (
      <thead className="thead-dark">
        <tr>
          {this.props.columns.map((column) => (
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => {
                this.raiseSort(column.path);
              }}
            >
              {column.label}
              {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}
TableHeader.propTypes = {
  columns: propTypes.array.isRequired,
  sortColumn: propTypes.object.isRequired,
  onSort: propTypes.func.isRequired,
};
export default TableHeader;
