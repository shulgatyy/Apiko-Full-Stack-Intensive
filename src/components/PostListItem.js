import React from "react";

export default class PostListItem extends React.PureComponent {
  render() {
    const { title, body } = this.props;
    return (
      <li>
        <h3>{title}</h3>
        <p>{body}</p>
      </li>
    );
  }
}