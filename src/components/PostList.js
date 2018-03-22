import React, {Component, Fragment} from 'react';
import PostListItem from "./PostListItem";
import MoreButton from "./MoreButton";
import data from '../data';

export default class PostList extends Component {
  state = {
    page: 1
  };

  showMore = () => {
    this.setState(prev => ({page: prev.page + 1}));
  };

  render() {
    const showCount = this.state.page * 10;
    const hasMore = data.length > showCount;
    return (
      <Fragment>
        <ol>
          {data.slice(0, showCount).map(
            post => <PostListItem key={post.id} {...post}/>
          )}
        </ol>
        {hasMore && <MoreButton action={this.showMore}/>}
      </Fragment>
    );
  }
}
