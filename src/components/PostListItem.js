import React from "react";

const PostListItem = ({ title, body }) => (
  <li>
    <h3>{title}</h3>
    <p>{body}</p>
  </li>
);

export default PostListItem;
