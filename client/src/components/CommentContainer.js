import React, { Component } from 'react';
import { ListGroupItem } from 'reactstrap';
import Comment from './Comment';
import { css } from 'react-emotion';

const commentSection = css`
   {
    font-size: 12px;
    border: none;
    border-left: 1px solid #eeeeee;
  }
`;
class CommentContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { comments } = this.props;

    if (!comments) return null;
    // map through all comments
    else {
      return comments.map(comment => {
        return (
          <ListGroupItem className={commentSection} value={comment.id}>
            <Comment comment={comment} onSubmit={this.onSubmit} />
          </ListGroupItem>
        );
      });
    }
  }
}

export default CommentContainer;
