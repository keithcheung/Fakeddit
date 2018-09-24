import React, { Component } from 'react';
import {
  ListGroup,
  ListGroupItem,
  Container,
  Media,
  Row,
  Col
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

export default class PostListing extends Component {
  render() {
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
                <Media heading>Media heading</Media>
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
