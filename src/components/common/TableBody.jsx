import React, { Component } from "react";
import _ from "lodash";
import { formatPrice, formatPercentage } from "../../utils/helper";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
/**
 * table body component takes
 * columns: array of objects{label,path}
 * data: data for table content, array of objects
 */
class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) {
      return column.content(item);
    }
    return _.get(item, column.path);
  };
  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };
  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data &&
          data.map((item, index) => (
            <tr key={index}>
              {columns.map((column, index) => {
                if (
                  column.label === "Price" ||
                  column.label === "Volume" ||
                  column.label === "Market Cap"
                ) {
                  return (
                    <td key={index}>
                      {formatPrice(this.renderCell(item, column))}
                    </td>
                  );
                }
                if (
                  column.label === "24h" ||
                  column.label === "7d" ||
                  column.label === "30d"
                ) {
                  return (
                    <td
                      key={index}
                      className={
                        this.renderCell(item, column) > 0
                          ? "text-success"
                          : "text-danger"
                      }
                    >
                      {formatPercentage(this.renderCell(item, column))}
                    </td>
                  );
                }
                return (
                  <td key={index} className="text-capitalize">
                    <img
                      alt={item["Coin"]}
                      src={`${
                        process.env.REACT_APP_IMAGE_URL + item["Coin"]
                      }.png`}
                      height="20"
                      style={{ marginRight: 10 }}
                    ></img>
                    <Link
                      to={{ pathname: `/coins/${item["Coin"]}`, state: item }}
                      style={{ color: "black" }}
                    >
                      {this.renderCell(item, column)}
                    </Link>
                  </td>
                );
              })}
            </tr>
          ))}
      </tbody>
    );
  }
}
TableBody.propTypes = {
  columns: propTypes.array.isRequired,
  data: propTypes.array.isRequired,
};

export default TableBody;
