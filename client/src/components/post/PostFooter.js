import React, { Component } from 'react';
import { css } from 'react-emotion';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import { graphql, compose } from 'react-apollo';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

import {
  editPost,
  getPost,
  removePost,
  getPosts,
  upvotePost,
  downvotePost
} from '../../queries/posts/post-queries';

import { removeComment } from '../../queries/comments/comment-queries';

import styled from 'styled-components';

const PostFooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const CenterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const ModalBtnContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 1.5rem;
`;

const responseModal = css`
  width: 50%;
  height: 50%;
  background-color: #ffffff;
  padding: 1.5rem;
`;

class PostFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      text: props.text,
      heading: props.heading,
      id: props.id
    };
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleEditModal = () => {
    this.setState({ open: true });
  };

  /**
   * Attempts to invoke editing the post
   */
  editPost = () => {
    const { text, heading, id } = this.state;
    try {
      this.props.editPost({
        variables: { id, heading, text },
        refetchQueries: [{ query: getPost, variables: { id } }]
      });
      this.handleClose();
    } catch (err) {
      console.error(`Failed refetching post after edit with error message ${err}`);
    }
  };

  /**
 * Takes the ID of a comment and will invoke the removeComment mutation
 * @param {ID} id - id of the comment
 */
  handleDeleteComment = id => {
    try {
      this.props.removeComment({
        variables: { id: id }
      }).then(function deleteChildren(res) {
        const { comments } = res.data.removeComment;
        comments.forEach(comment => {
          this.handleDeleteComment(comment.id);
        })
      }.bind(this));
    } catch (err) {
      console.error(`Failed to remove comment with error ${err}`);
    }
  };

  /**
   * Removes the post 
   * TODO: remove comments that are integrated on the post
   */
  deletePost = () => {
    const { id } = this.state;
    const { comments } = this.props;
    debugger;
    try {
      this.props.removePost({
        variables: { id },
        refetchQueries: [{ query: getPosts }]
      });
      comments.forEach(comment => { this.handleDeleteComment(comment.id) });
      this.props.history.push('/');

    } catch (err) {
      console.error(`Failed to remove post with error message: ${err}`)
    }
  };

  render() {
    const { text, heading, id } = this.state;
    const { mainPage, upvotes, owner } = this.props;
    return (
      <div>
        <PostFooterContainer>
          <div>
            <FontAwesomeIcon
              icon={faThumbsUp}
              style={{ marginRight: '0.5rem' }}
              onClick={e => {
                try {
                  this.props.upvotePost({
                    variables: { id },
                    refetchQueries: [{ query: getPost, variables: { id } }]
                  });
                } catch (err) {
                  console.error(`Failed refetching query with ${err}`);
                }
              }}
            />
            {upvotes}
            <FontAwesomeIcon
              style={{ marginLeft: '0.5rem' }}
              icon={faThumbsDown}
              onClick={e => {
                try {
                  this.props.downvotePost({
                    variables: { id },
                    refetchQueries: [{ query: getPost, variables: { id } }]
                  });
                } catch (err) {
                  console.error(`Failed refetching query with ${err}`);
                }
              }}
            />
          </div>
          {!mainPage && owner && (
            <div>
              <IconButton aria-label="Delete">
                <DeleteIcon onClick={this.deletePost} />
              </IconButton>
              <IconButton aria-label="Edit">
                <EditIcon onClick={this.handleEditModal} />
              </IconButton>
            </div>
          )}
        </PostFooterContainer>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <CenterContainer>
            <div className={responseModal}>
              <TextField
                id="outlined-multiline-flexible"
                fullWidth={true}
                label="Title"
                rowsMax="6"
                margin="normal"
                value={heading}
                variant="outlined"
                onChange={e => {
                  this.setState({ heading: e.target.value });
                }}
              />
              <TextField
                id="outlined-multiline-flexible"
                fullWidth={true}
                label="Content"
                multiline
                rowsMax="6"
                margin="normal"
                value={text}
                variant="outlined"
                onChange={e => {
                  this.setState({ text: e.target.value });
                }}
              />
              <ModalBtnContainer>
                <Button color="primary" onClick={this.editPost}>
                  Post
                </Button>
                <Button color="seconday" onClick={this.handleClose}>
                  Cancel
                </Button>
              </ModalBtnContainer>
            </div>
          </CenterContainer>
        </Modal>
      </div>
    );
  }
}

export default compose(
  graphql(editPost, { name: 'editPost' }),
  graphql(removePost, { name: 'removePost' }),
  graphql(upvotePost, { name: 'upvotePost' }),
  graphql(downvotePost, { name: 'downvotePost' }),
  graphql(removeComment, { name: 'removeComment' }),
)(withRouter(PostFooter));
