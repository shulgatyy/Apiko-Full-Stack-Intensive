import React from "react";

const Search = ({ value, onChange }) => (
  <p>
    search
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="by title"
    />
  </p>
);

export default Search;
