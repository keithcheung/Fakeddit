import React, { Component } from 'react';
import {
  ListGroup,
  ListGroupItem,
  Container,
  Media,
  Row,
  Col
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

import { graphql } from 'react-apollo';
import { getPosts } from '../queries/queries';

class PostListing extends Component {
  displayPosts() {
    const { data } = this.props;
    if (data.loading) {
      return (
        <ListGroupItem>
          <Media>Loading posts...</Media>
        </ListGroupItem>
      );
    } else {
      return data.posts.map(post => {
        return (
          <ListGroupItem
            onClick={() => {
              console.log('clicked');
            }}
            key={post.id}
            value={post.id}
          >
            <Media>
              <Media heading>
                {/* Pass ID through here, make call */}
                <Link
                  to={{ pathname: `/post/${post.id}`, state: { foo: post.id } }}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  {post.heading}
                </Link>
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
        );
      });
    }
  }
  render() {
    return (
      <Container>
        <ListGroup style={{ marginTop: '2rem' }}>
          {this.displayPosts()}
        </ListGroup>
      </Container>
    );
  }
}

export default graphql(getPosts)(PostListing);
