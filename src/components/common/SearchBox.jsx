import React from "react";

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

export default SearchBox;
