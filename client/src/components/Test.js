import React, { Component } from 'react';
import { Container } from 'reactstrap';

export default class Test extends Component {
  constructor({ match }) {
    super();
    this.state = {
      postId: match.params.postId
    };
  }
  render() {
    return (
      <Container>
        <h1>{this.state.postId}</h1>
      </Container>
    );
  }
}
