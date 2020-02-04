import React, { Component } from 'react';
import { ListGroup, Row, Col } from 'reactstrap';
import {
  getComment,
  addComment,
  removeComment,
  editComment
} from '../../queries/comments/comment-queries';
import { getPost } from '../../queries/posts/post-queries'

import TextField from '@material-ui/core/TextField';
import { graphql, compose } from 'react-apollo';
import CommentContainer from './CommentContainer';
import CommentTextInput from './CommentTextInput';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const CommentText = styled.p`
  padding-bottom: 8px;
`;

/**
 * @class Comment
 * Comment component which handles majority of comment functionality.
 */
class Comment extends Component {
  constructor(props) {
    super(props);

    this.handleDeleteComment = this.handleDeleteComment.bind(this);
    this.displayComments = this.displayComments.bind(this);
    this.togglePost = this.togglePost.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.maybeRenderTextInput = this.maybeRenderTextInput.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.clearEdit = this.clearEdit.bind(this);

    const { loading } = props.data;
    this.state = { toogle: false, editingComment: false };
    // Ensure component has loaded data before proceeding
    if (!loading) {
      this.state = {
        text: props.data.comment.text,
        uid: props.data.comment.uid,
        id: props.data.comment.id,
        comments: props.data.comment.comments,
        toggle: false
      };
    }
  }

  componentWillReceiveProps(newProps) {
    const { loading } = newProps.data;
    if (!loading) {
      this.setState({
        uid: newProps.data.comment.uid,
        text: newProps.data.comment.text,
        newComment: newProps.data.comment.text,
        id: newProps.data.comment.id,
        comments: newProps.data.comment.comments
      });
    }
  }

  /**
   * Takes the ID of a comment and will invoke the removeComment mutation
   * @param {ID} id - id of the comment
   */
  handleDeleteComment = id => {
    const { postId } = this.props;
    const { uid, comments } = this.state;
    // Would have to nest through comments here
    try {
      this.props.removeComment({
        variables: { id: id },
        refetchQueries: [
          { query: getComment, variables: { id: uid } },
          { query: getPost, variables: { id: postId } }
        ]
      });
    } catch (err) {
      console.error(`Failed to remove comment with error ${err}`);
    }
  };

  /**
   * Parses comments and displays comments accordingly
   */
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

  /**
   * Determines whether or not to open the response modal
   */
  togglePost = () => {
    const { toggle } = this.state;
    this.setState({ toggle: !toggle });
  };

  /**
   * Will invoke addComment given a new comment
   * @param {Object} newComment - the comment
   * @param {string} newComment.name - username of the commenter
   * @param {string} newComment.response - the text of the comment
   * @param {ID} newComment.id - ID of the comment
   */
  handleConfirm = newComment => {
    const { name, response, id } = newComment;
    try {
      this.props.addComment({
        variables: { name: name, uid: id, text: response },
        refetchQueries: [{ query: getComment, variables: { id } }]
      });
      this.togglePost();
    } catch (err) {
      console.error(`Failed to add comment with an error of ${err}`)
    }
  };

  /**
   * Changes to edit mode
   */
  toggleEdit = () => {
    const { editingComment } = this.state;
    this.setState({ editingComment: !editingComment });
  };

  /**
   * Function called when user is typing in the textbox
   * @param {Object} event - The event on the textbox
   */
  handleCommentChange = event => {
    this.setState({
      newComment: event.target.value
    });
  };

  /** 
   * Clears all the fields on cancel of response button 
   */
  clearEdit = () => {
    const { text } = this.state;
    this.setState({ newComment: text });
    this.toggleEdit();
  };

  /**
   * Attempts to invoke function that edits comment 
   */
  handleEdit = () => {
    const { id, newComment } = this.state;
    try {
      this.props.editComment({
        variables: { id, text: newComment },
        refetchQueries: [{ query: getComment, variables: { id } }]
      });
      this.toggleEdit();
    } catch (err) {
      console.error(`Failed to edit commit with error message: ${err}`)
    }
  };

  /**
   * Renders Reply, Edit and Delete buttons if current user is logged in.
   */
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
            onCancel={this.togglePost}
            postId={this.props.postId}
          />
        </div>
      );
    } else {
      return (
        <div>
          <CommentText>{text}</CommentText>
          <div>
            <Button size="small" onClick={this.togglePost}>
              reply
            </Button>
            <Button size="small" onClick={this.toggleEdit}>
              edit
            </Button>
            <Button
              size="small"
              onClick={() => {
                this.handleDeleteComment(id);
              }}
            >
              delete
            </Button>
          </div>
        </div>
      );
    }
  }

  render() {
    const { loading } = this.props.data;
    const { editingComment, newComment } = this.state;
    if (loading) {
      return null;
    } else if (editingComment) {
      return (
        <Row>
          <Col xs="10">
            <TextField
              fullWidth={true}
              id="standard-multiline-flexible"
              label="reply"
              multiline
              rowsMax="4"
              value={newComment}
              onChange={e => this.handleCommentChange(e)}
            />
          </Col>
          <Col xs="2">
            <Row>
              <Button color="secondary" size="sm" onClick={this.handleEdit}>
                edit
              </Button>
            </Row>
            <Row>
              <Button color="info" size="sm" onClick={this.clearEdit}>
                cancel
              </Button>
            </Row>
          </Col>
        </Row>
      );
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
  }),
  graphql(editComment, {
    name: 'editComment'
  })
)(Comment);
