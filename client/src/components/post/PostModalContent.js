import React, { Component } from 'react';
import { Button } from 'reactstrap';

import { graphql, compose } from 'react-apollo';
import { addComment } from '../../queries/comments/comment-queries';
import { getPost } from '../../queries/posts/post-queries';

import TextField from '@material-ui/core/TextField';

import styled from 'styled-components';
import { findUserName } from '../../queries/user/user-queries';

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: '40px';
  width: 100%;
`;

const PostModalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding: 1.5rem;
  height: 100%;
`;

/**
 * Modal that pops out to include information on the new post
 */
class PostModalContent extends Component {
  constructor(props) {
    super(props);
    this.state = { comment: '', name: '' };
    this.handleSubmitComment = this.handleSubmitComment.bind(this);
    this.onCommentChange = this.onCommentChange.bind(this);
  }

  handleSubmitComment() {
    const { comment } = this.state;
    const { username } = this.props.username.user;
    const { postId } = this.props;
    try {
      this.props.addComment({
        variables: { name: username, uid: postId, text: comment },
        refetchQueries: [{ query: getPost, variables: { id: postId } }]
      });
      this.props.handleClose();
    } catch (err) {
      console.error(`Failed to add comment with ${err}`);
    }
  }

  onCommentChange(event) {
    this.setState({ comment: event.target.value });
  }

  render() {
    return (
      <PostModalContainer>
        <TextField
          id="outlined-multiline-flexible"
          fullWidth={true}
          label="Comment"
          multiline
          rowsMax="6"
          margin="normal"
          variant="outlined"
          onChange={event => this.onCommentChange(event)}
        />
        <ButtonWrapper>
          <Button color="primary" onClick={this.handleSubmitComment}>
            Comment
          </Button>
          <Button color="secondary" onClick={this.props.handleClose}>
            Cancel
          </Button>
        </ButtonWrapper>
      </PostModalContainer>
    );
  }
}

export default compose(graphql(addComment, { name: 'addComment' }),
  graphql(findUserName, {
    name: 'username',
    options: props => {
      return {
        variables: {
          id: sessionStorage.userId,
        }
      };
    }
  }))(PostModalContent);
