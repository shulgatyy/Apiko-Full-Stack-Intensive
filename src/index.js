import React from "react";
import ReactDOM from "react-dom";
import { injectGlobal } from "styled-components";
import PostList from "./components/PostList";

injectGlobal`
body {
  margin: 0;
  padding: 1%;
  font-family: sans-serif;
}
`;

ReactDOM.render(<PostList />, document.getElementById("root"));
