import React, { Component } from 'react';
import { Button } from 'reactstrap';

import { graphql } from 'react-apollo';
import { addComment, getPost } from '../../queries/queries';
import TextField from '@material-ui/core/TextField';

import styled from 'styled-components';
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
    this.state = { comment: '', name: 'kcheung' };
    this.handleSubmitComment = this.handleSubmitComment.bind(this);
    this.onCommentChange = this.onCommentChange.bind(this);
  }

  handleSubmitComment() {
    const { comment, name } = this.state;
    const { postId } = this.props;

    this.props.addComment({
      variables: { name: name, uid: postId, text: comment },
      refetchQueries: [{ query: getPost, variables: { id: postId } }]
    });
    this.props.handleClose();
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

export default graphql(addComment, { name: 'addComment' })(PostModalContent);
