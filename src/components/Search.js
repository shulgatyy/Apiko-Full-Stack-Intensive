import React from "react";
import styled from "styled-components";

const Input = styled.input.attrs({
  type: "text",
  placeholder: "by title"
})`
  margin: 0 5px;
`;

const Search = ({ value, onChange }) => (
  <p>
    search
    <Input value={value} onChange={onChange} />
  </p>
);

export default Search;
