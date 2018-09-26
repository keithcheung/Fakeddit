import React, { Component } from 'react';
import { ListGroup, Row, Col, Button } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import { getComment, addComment } from '../queries/queries';
import { graphql, compose } from 'react-apollo';
import CommentContainer from './CommentContainer';
import CommentTextInput from './CommentTextInput';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.handleComment = this.handleComment.bind(this);
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
        <ListGroup style={{ border: '0 none' }}>
          <CommentContainer comments={comments} />
        </ListGroup>
      );
    }
  }

  render() {
    const { loading } = this.props.data;
    const { id } = this.props.comment;
    if (loading) {
      return null;
    } else {
      const { text } = this.state;
      return (
        <div>
          {text}
          {this.displayComments()}
          <CommentTextInput id={id} />
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
