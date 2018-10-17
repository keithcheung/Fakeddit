import React, { Component } from 'react';
import { css } from 'react-emotion';
import { Container, Button } from 'reactstrap';

import { graphql } from 'react-apollo';
import { addComment } from '../../queries/queries';

const override = css`
  display: block;
  margin: 5rem auto;
  border-color: red;
`;

class PostModalContent extends Component {
  render() {
    return (
      <Container>
        <Button color="primary">Comment</Button>
        <Button color="secondary">Cancel</Button>
      </Container>
    );
  }
}

export default graphql(addComment)(PostModalContent);
