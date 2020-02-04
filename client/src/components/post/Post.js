import React, { Component } from 'react';
import { css } from 'react-emotion';
import { Container, Media, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { getPost } from '../../queries/posts/post-queries';
import { graphql, compose } from 'react-apollo';

import Modal from '@material-ui/core/Modal';
import PostFooter from './PostFooter';

import { RingLoader } from 'react-spinners';

import CommentContainer from '../comment/CommentContainer';
import PostModalContent from './PostModalContent';

import styled from 'styled-components';
// I can get comments here so that I dont have to do it each time on every comments
// False, making it the way I'm doing right now has a better runtime 

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

/**
 * @class Post
 * Handles SINGLE post functionality, for list see PostListing
 * url: post/{post-id}
 */
class Post extends Component {
  constructor({ match }) {
    super();
    this.state = {
      postId: match.params.postId,
      open: false,
      userId: sessionStorage.userId
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

  /**
   * handles displaying the Post and some of it's footer
   */
  displayPost() {
    const { heading, text, upvotes, uid } = this.props.data.post;
    const { postId, userId } = this.state;
    const owner = userId === uid;
    return (
      <div>
        <SpreadedContainer>
          <div>
            <Media>
              <Media body>
                <Media heading>{heading}</Media>
                {text}
              </Media>
            </Media>
          </div>
          <Button
            disabled={userId == null}
            color="primary"
            onClick={this.renderResponseModal.bind(this)}
          >
            Reply
          </Button>
        </SpreadedContainer>
        <PostFooter
          id={postId}
          owner={owner}
          heading={heading}
          text={text}
          upvotes={upvotes}
          mainPage={false}
        />
      </div>
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
