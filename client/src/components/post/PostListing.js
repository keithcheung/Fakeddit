import React, { Component } from 'react';
import { css } from 'react-emotion';
import { ListGroup, ListGroupItem, Container, Media, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';

import { graphql, compose } from 'react-apollo';
import { getPosts, addPost, findUserName } from '../../queries/queries';

import PostFooter from './PostFooter';
import { RingLoader } from 'react-spinners';
import styled from 'styled-components';

const PostBtnContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding-top: 2rem;
  padding-right: 2rem;
`;

const override = css`
  display: block;
  margin: 5rem auto;
  border-color: red;
`;

const responseModal = css`
  width: 50%;
  height: 50%;
  background-color: #ffffff;
  padding: 1.5rem;
`;

const CenterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const ModalBtnContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 1.5rem;
`;

class PostListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      heading: '',
      text: '',
      userId: sessionStorage.userId
    };
    this.displayPosts = this.displayPosts.bind(this);
    this.addPost = this.addPost.bind(this);
  }

  /**
   * Handles the displaying posts in the main feed
   */
  displayPosts() {
    const { data } = this.props;

    return data.posts.map(post => {
      return (
        <ListGroupItem key={post.id} value={post.id}>
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
          <PostFooter
            id={post.id}
            heading={post.heading}
            text={post.text}
            upvotes={post.upvotes}
            mainPage={true}
          />
        </ListGroupItem>
      );
    });
  }

  togglePostModal = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  /**
   * Adds a post from the main feed
   */
  addPost = () => {
    // userId should be available if they got to call addPost
    const { heading, text, userId } = this.state;

    try {
      debugger;
      const { username } = this.props.username.user;
      debugger;
      this.props.addPost({
        variables: { name: username, heading, text, uid: userId },
        refetchQueries: [{ query: getPosts }]
      });
      this.togglePostModal();
    } catch (err) {
      console.error(`Failed loading posts with error: ${err}`)
    }
  };

  render() {
    const { loading } = this.props.data;
    const { userId } = this.state;

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
          <PostBtnContainer>
            <Button
              disabled={userId == null}
              color="primary"
              onClick={this.togglePostModal}
            >
              Post
            </Button>
          </PostBtnContainer>
          <ListGroup style={{ marginTop: '2rem' }}>
            {this.displayPosts()}
          </ListGroup>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
          >
            <CenterContainer>
              <div className={responseModal}>
                <TextField
                  id="outlined-multiline-flexible"
                  fullWidth={true}
                  label="Title"
                  rowsMax="6"
                  margin="normal"
                  variant="outlined"
                  onChange={e => {
                    this.setState({ heading: e.target.value });
                  }}
                />
                <TextField
                  id="outlined-multiline-flexible"
                  fullWidth={true}
                  label="Content"
                  multiline
                  rowsMax="6"
                  margin="normal"
                  variant="outlined"
                  onChange={e => {
                    this.setState({ text: e.target.value });
                  }}
                />
                <ModalBtnContainer>
                  <Button color="primary" onClick={this.addPost}>
                    Post
                  </Button>
                  <Button color="seconday" onClick={this.togglePostModal}>
                    Cancel
                  </Button>
                </ModalBtnContainer>
              </div>
            </CenterContainer>
          </Modal>
        </Container>
      );
    }
  }
}

export default compose(
  graphql(getPosts, { name: 'data' }),
  graphql(addPost, { name: 'addPost' }),
  graphql(findUserName, {
    name: 'username',
    options: props => {
      return {
        variables: {
          id: sessionStorage.userId,
        }
      };
    }
  })
)(PostListing);
