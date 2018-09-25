import React, { Component } from 'react';
import { ListGroup } from 'reactstrap';
import { getComment } from '../queries/queries';
import { graphql } from 'react-apollo';
import CommentContainer from './CommentContainer';
class Comment extends Component {
  constructor(props) {
    super(props);
    const { loading } = props.data;
    if (!loading) {
      this.state = {
        text: props.data.comment.text,
        comments: props.data.comment.comments
      };
    }
  }
  // have to update text like this otherwise it was undefined
  componentWillReceiveProps(newProps) {
    const { loading } = newProps.data;
    if (!loading) {
      this.state = {
        text: newProps.data.comment.text,
        comments: newProps.data.comment.comments
      };
    }
  }
  displayComments() {
    const { comments } = this.state;
    if (!comments) {
      return null;
    } else {
      return (
        <ListGroup>
          <CommentContainer comments={comments} />
        </ListGroup>
      );
    }
  }
  render() {
    const { loading } = this.props.data;
    if (loading) {
      return null;
    } else {
      const { text } = this.state;
      debugger;
      return (
        <div>
          {text}
          {this.displayComments()}
        </div>
      );
    }
  }
}

export default graphql(getComment, {
  options: props => {
    return {
      variables: {
        id: props.comment.id
      }
    };
  }
})(Comment);
