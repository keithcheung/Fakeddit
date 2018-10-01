import React, { Component } from 'react';
import { css } from 'react-emotion';
import {
  Container,
  Media,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { getPost, addComment, removeComment } from '../queries/queries';
import { graphql, compose } from 'react-apollo';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

import { RingLoader } from 'react-spinners';

import CommentContainer from './CommentContainer';

const override = css`
  display: block;
  margin: 5rem auto;
  border-color: red;
`;

class Post extends Component {
  constructor({ match }) {
    super();
    this.state = {
      postId: match.params.postId
    };
  }
  displayPost() {
    const { heading, text } = this.props.data.post;
    return (
      <div>
        <Media>
          <Media body>
            <Media heading>{heading}</Media>
            {text}
          </Media>
        </Media>
        <Row>
          <Col sm={{ size: 'auto', offset: 0.5 }}>
            <FontAwesomeIcon
              icon={faThumbsUp}
              style={{ marginRight: '1rem' }}
              onClick={e => {
                e.stopPropagation();
                console.log(this.state.postId);
              }}
            />
            <FontAwesomeIcon icon={faThumbsDown} />
          </Col>
        </Row>
      </div>
    );
  }

  handleDeleteComment = id => {
    console.log('pop');
    this.props.removeComment({
      variables: { id: id },
      refetchQueries: [{ query: getPost }],
      awaitRefetchQueries: true
    });
    this.forceUpdate();
  };

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
      const { comments } = this.props.data.post;
      debugger;
      return (
        <Container>
          <Button
            style={{
              marginTop: '2rem'
            }}
            color="primary"
          >
            <Link
              to="/"
              style={{
                textDecoration: 'none',
                color: 'white'
              }}
            >
              Back
            </Link>
          </Button>
          <ListGroup style={{ marginTop: '2rem' }}>
            <ListGroupItem>{this.displayPost()}</ListGroupItem>
          </ListGroup>
          <ListGroup>
            <CommentContainer
              comments={comments}
              handleDeleteComment={this.handleDeleteComment}
            />
          </ListGroup>
        </Container>
      );
    }
  }
}

export default compose(
  graphql(getPost, {
    name: 'data',
    options: props => {
      return {
        variables: {
          id: props.location.state.id
        }
      };
    }
  }),
  graphql(addComment, { name: 'addComment' }),
  graphql(removeComment, { name: 'removeComment' })
)(Post);
