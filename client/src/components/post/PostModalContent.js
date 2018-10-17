import React, { Component } from 'react';
import { Button } from 'reactstrap';

import { graphql } from 'react-apollo';
import { addComment } from '../../queries/queries';
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
class PostModalContent extends Component {
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
        />
        <ButtonWrapper>
          <Button color="primary">Comment</Button>
          <Button color="secondary" onClick={this.props.handleClose}>
            Cancel
          </Button>
        </ButtonWrapper>
      </PostModalContainer>
    );
  }
}

export default graphql(addComment)(PostModalContent);
