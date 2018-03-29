import React, { Component, Fragment } from "react";
import PostListItem from "./PostListItem";
import MoreButton from "./MoreButton";
import data from "../data";
import Search from "./Search";
import NothingToShow from "./NothingToShow";

export default class PostList extends Component {
  state = {
    page: 1,
    search: ""
  };

  showMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  handleChange = ({ target: { value: search } }) => {
    this.setState({ search });
  };

  static renderList(posts) {
    return (
      <ol>{posts.map(post => <PostListItem key={post.id} {...post} />)}</ol>
    );
  }

  render() {
    const { search, page } = this.state;
    const showCount = page * 10;
    const hasMore = data.length > showCount;
    const postsToShow = data
      .slice(0, showCount)
      .filter(({ title }) => title.includes(search));
    return (
      <Fragment>
        <Search value={search} onChange={this.handleChange} />
        {postsToShow.length
          ? PostList.renderList(postsToShow)
          : <NothingToShow />}
        {hasMore && <MoreButton action={this.showMore} />}
      </Fragment>
    );
  }
}
