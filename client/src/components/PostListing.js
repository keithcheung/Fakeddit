import React, { Component } from 'react';
import {
  ListGroup,
  ListGroupItem,
  Container,
  Media,
  Row,
  Col
} from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

import { graphql } from 'react-apollo';
import { getPosts } from '../queries/queries';

class PostListing extends Component {
  render() {
    console.log(this.props.data);
    return (
      <Container>
        <ListGroup>
          <ListGroupItem
            onClick={() => {
              console.log('clicked');
            }}
          >
            <Media>
              <Media body>
                <Media heading>
                  {/* Pass ID through here, make call */}
                  <Link
                    to={{ pathname: '/about', state: { foo: 'bar' } }}
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    Media heading
                  </Link>
                </Media>
              </Media>
            </Media>
            <Row>
              <Col sm={{ size: 'auto', offset: 0.5 }}>
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  style={{ marginRight: '1rem' }}
                  onClick={e => {
                    e.stopPropagation();
                    console.log('clicked icon');
                  }}
                />
                <FontAwesomeIcon icon={faThumbsDown} />
              </Col>
            </Row>
          </ListGroupItem>
          <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
          <ListGroupItem>Morbi leo risus</ListGroupItem>
          <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
          <ListGroupItem>Vestibulum at eros</ListGroupItem>
        </ListGroup>
      </Container>
    );
  }
}

export default graphql(getPosts)(PostListing);
