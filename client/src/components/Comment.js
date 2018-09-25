import React, { Component } from 'react';
import { ListGroup } from 'reactstrap';

class CommentContainer extends Component {
  render() {
    return (
      <ListItem>
        <Comment />
      </ListItem>
    );
  }
}

export default CommentContainer;
