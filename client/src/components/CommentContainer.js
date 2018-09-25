import React, { Component } from 'react';
import { ListGroupItem } from 'reactstrap';

import Comment from './Comment';
class CommentContainer extends Component {
  render() {
    const { comments } = this.props;
    console.log('hit');
    if (!comments) return null;
    // map through all comments
    else {
      return comments.map(comment => {
        return (
          <ListGroupItem>
            <Comment comment={comment} />
          </ListGroupItem>
        );
      });
    }
  }
}

export default CommentContainer;
