import React, { Component } from 'react';
import { css } from 'react-emotion';
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

import { RingLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 5rem auto;
  border-color: red;
`;
class PostListing extends Component {
  displayPosts() {
    const { data } = this.props;

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
                to={{
                  pathname: `/post/${post.id}`,
                  state: { id: post.id }
                }}
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
  render() {
    const { loading } = this.props.data;
    if (loading) {
      return (
        <RingLoader
          className={override}
          sizeUnit={'px'}
          size={75}
          color={'#A1D6EB'}
          loading={loading}
        />
      );
    } else {
      return (
        <Container>
          <ListGroup style={{ marginTop: '2rem' }}>
            {this.displayPosts()}
          </ListGroup>
        </Container>
      );
    }
  }
}

export default graphql(getPosts)(PostListing);
