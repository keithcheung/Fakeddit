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
import { getPost } from '../../queries/queries';
import { graphql, compose } from 'react-apollo';

import Modal from '@material-ui/core/Modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

import { RingLoader } from 'react-spinners';

import CommentContainer from '../comment/CommentContainer';
import PostModalContent from './PostModalContent';

import styled from 'styled-components';

const override = css`
  display: block;
  margin: 5rem auto;
  border-color: red;
`;

const responseModal = css`
  width: 50%;
  height: 50%;
  background-color: #ffffff;
`;

const SpreadedContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`;

const CenterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

class Post extends Component {
  constructor({ match }) {
    super();
    this.state = {
      postId: match.params.postId,
      open: false
    };
    this.handleClose = this.handleClose.bind(this);
    this.renderResponseModal = this.renderResponseModal.bind(this);
  }

  handleClose() {
    this.setState({ open: false });
  }

  renderResponseModal() {
    this.setState({ open: true });
  }

  displayPost() {
    const { heading, text } = this.props.data.post;
    return (
      <SpreadedContainer>
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
        <Button color="primary" onClick={this.renderResponseModal.bind(this)}>
          Reply
        </Button>
      </SpreadedContainer>
    );
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
      const { comments } = this.props.data.post;
      return (
        <Container>
          <Button
            style={{
              marginTop: '2rem'
            }}
            color="secondary"
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
            <CommentContainer comments={comments} postId={this.state.postId} />
          </ListGroup>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
          >
            <CenterContainer>
              <div className={responseModal}>
                <PostModalContent
                  handleClose={this.handleClose}
                  postId={this.state.postId}
                />
              </div>
            </CenterContainer>
          </Modal>
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
  })
)(Post);