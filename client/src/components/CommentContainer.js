import React, { Component } from 'react';
import { ListGroupItem } from 'reactstrap';
class CommentContainer extends Component {
  render() {
    console.log(this.props.comments);
    return (
      <ListGroupItem>
        <h1> hi there i'm not ready :(</h1>
      </ListGroupItem>
    );
  }
}

export default CommentContainer;
