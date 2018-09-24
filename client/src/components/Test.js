import React, { Component } from 'react';
import { Container } from 'reactstrap';

export default class Test extends Component {
  render() {
    const { foo } = this.props.location.state;
    console.log(foo);
    return (
      <Container>
        <h1>{foo}</h1>
      </Container>
    );
  }
}
