import React, { Component } from 'react';
import { ListGroup } from 'reactstrap';
import { getComment, addComment, removeComment } from '../queries/queries';
import { graphql, compose } from 'react-apollo';
import CommentContainer from './CommentContainer';
import CommentTextInput from './CommentTextInput';

class Comment extends Component {
  constructor(props) {
    super(props);
    const { loading } = props.data;
    if (!loading) {
      this.setState({
        text: props.data.comment.text,
        uid: props.data.comment.uid,
        comments: props.data.comment.comments
      });
    }
  }
  // have to update text like this otherwise it was undefined
  componentWillReceiveProps(newProps) {
    const { loading } = newProps.data;
    if (!loading) {
      this.setState({
        uid: newProps.data.comment.uid,
        text: newProps.data.comment.text,
        comments: newProps.data.comment.comments
      });
    }
  }

  handleDeleteComment = id => {
    const { uid } = this.state;
    this.props.removeComment({
      variables: { id: id },
      refetchQueries: [{ query: getComment, variables: { id: uid } }]
    });
  };

  displayComments() {
    const { comments } = this.state;
    if (!comments) {
      return null;
    } else {
      return (
        <ListGroup style={{ border: '0 none' }}>
          <CommentContainer
            handleDeleteComment={this.handleDeleteComment}
            postId={this.props.postId}
            comments={comments}
          />
        </ListGroup>
      );
    }
  }

  togglePost = () => {
    const { toggle } = this.state;
    this.setState({ toggle: !toggle });
  };

  handleConfirm = newComment => {
    const { name, response, id } = newComment;
    this.props.addComment({
      variables: { name: name, uid: id, text: response },
      refetchQueries: [{ query: getComment, variables: { id } }]
    });
    // this.props.addComment({newComment);
    this.togglePost();
  };

  maybeRenderTextInput() {
    const { toggle, text } = this.state;
    const { id } = this.props.comment;
    if (toggle) {
      return (
        <div>
          {text}
          <CommentTextInput
            id={id}
            onConfirm={this.handleConfirm}
            postId={this.props.postId}
          />
        </div>
      );
    } else {
      return (
        <div>
          {text}
          <p onClick={this.togglePost}>reply</p>
          <p
            onClick={() => {
              this.handleDeleteComment(id);
            }}
          >
            delete{' '}
          </p>
        </div>
      );
    }
  }

  render() {
    const { loading } = this.props.data;
    if (loading) {
      return null;
    } else {
      return (
        <div>
          {this.maybeRenderTextInput()}
          {this.displayComments()}
        </div>
      );
    }
  }
}

export default compose(
  graphql(getComment, {
    options: props => {
      return {
        variables: {
          id: props.comment.id
        }
      };
    }
  }),
  graphql(addComment, {
    name: 'addComment'
  }),
  graphql(removeComment, {
    name: 'removeComment'
  })
)(Comment);
