import React from "react";
import TableHeadeer from "./TableHeader";
import TableBody from "./TableBody";
import propTypes from "prop-types";
/**
 * Table component takes:
 * columns: array of objects{label,path}
 * sortColumn: current column that need to be sort, object.{path, order} order can be "asc" or "desc"
 * data: data for table content, array of objects
 * onSort function
 */
const Table = ({ columns, sortColumn, onSort, data }) => {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-bordered  table-striped">
        <TableHeadeer
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody data={data} columns={columns} />
      </table>
    </div>
  );
};
Table.propTypes = {
  columns: propTypes.array.isRequired,
  sortColumn: propTypes.object.isRequired,
  onSort: propTypes.func.isRequired,
  data: propTypes.array.isRequired,
};

export default Table;
