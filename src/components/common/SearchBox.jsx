import React from "react";
import propTypes from "prop-types";
/**
 * Search bar component takes a value and an onChange function
 */
const SearchBox = ({ value, onChange }) => {
  return (
    <input
      type="text"
      name="query"
      className="form-control my-2"
      placeholder="Search..."
      value={value}
      onChange={(e) => {
        onChange(e.currentTarget.value);
      }}
    ></input>
  );
};
SearchBox.propTypes = {
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
};

export default SearchBox;
