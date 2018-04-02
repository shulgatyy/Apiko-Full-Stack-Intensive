import React, { Component, Fragment } from "react";
import PostListItem from "./PostListItem";
import Search from "./Search";
import NothingToShow from "./NothingToShow";

export default class PostList extends Component {
  state = {
    posts: [],
    isLoading: true,
    search: ""
  };

  handleChange = ({ target: { value: search } }) => {
    this.setState({ search });
  };

  componentDidMount() {
    this.fetchPosts();
    this.interval = setInterval(() => this.fetchPosts(), 30 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetchPosts() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(r => r.json())
      .then(r =>
        this.setState({
          posts: r,
          isLoading: false
        })
      );
  }

  renderList() {
    const { posts, search } = this.state;
    const filtered = posts.filter(({ title }) => title.includes(search));
    return filtered.length ? (
      <ol>{filtered.map(post => <PostListItem key={post.id} {...post} />)}</ol>
    ) : (
      <NothingToShow />
    );
  }

  render() {
    const { search, isLoading } = this.state;
    return (
      <Fragment>
        <Search value={search} onChange={this.handleChange} />
        {isLoading ? "loading" : this.renderList()}
      </Fragment>
    );
  }
}
