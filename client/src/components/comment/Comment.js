import React, { Component } from 'react';
import { ListGroup, Row, Col, Button } from 'reactstrap';
import {
  getComment,
  addComment,
  removeComment,
  getPost,
  editComment
} from '../../queries/queries';
import TextField from '@material-ui/core/TextField';
import { graphql, compose } from 'react-apollo';
import CommentContainer from './CommentContainer';
import CommentTextInput from './CommentTextInput';

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
  // have to update text like this otherwise it was undefined
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

  handleDeleteComment = id => {
    const { postId } = this.props;
    const { uid } = this.state;
    this.props.removeComment({
      variables: { id: id },
      refetchQueries: [
        { query: getComment, variables: { id: uid } },
        { query: getPost, variables: { id: postId } }
      ]
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
    this.togglePost();
  };

  toggleEdit = () => {
    const { editingComment } = this.state;
    this.setState({ editingComment: !editingComment });
  };

  handleCommentChange = event => {
    this.setState({
      newComment: event.target.value
    });
  };

  clearEdit = () => {
    const { text } = this.state;
    this.setState({ newComment: text });
    this.toggleEdit();
  };

  handleEdit = () => {
    const { id, newComment } = this.state;
    this.props.editComment({
      variables: { id, text: newComment },
      refetchQueries: [{ query: getComment, variables: { id } }]
    });
    this.toggleEdit();
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
          <p onClick={this.toggleEdit}>edit</p>
          <p
            onClick={() => {
              this.handleDeleteComment(id);
            }}
          >
            delete
          </p>
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
              <Button color="info" size="sm" onClick={this.handleEdit}>
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
