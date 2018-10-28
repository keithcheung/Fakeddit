import React, { Component } from 'react';
import { css } from 'react-emotion';
import { Button } from 'reactstrap';
import { graphql, compose } from 'react-apollo';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

import { editPost, getPosts } from '../../queries/queries';

import styled from 'styled-components';

const PostFooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
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

const responseModal = css`
  width: 50%;
  height: 50%;
  background-color: #ffffff;
  padding: 1.5rem;
`;

class PostFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      text: props.text,
      heading: props.heading,
      id: props.id
    };
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleEditModal = () => {
    this.setState({ open: true });
  };

  editPost = () => {
    const { text, heading, id } = this.state;
    this.props.editPost({
      variables: { id, heading, text },
      refetchQueries: { query: getPosts }
    });
    this.handleClose();
  };

  render() {
    const { text, heading } = this.state;
    return (
      <div>
        <PostFooterContainer>
          <div>
            <FontAwesomeIcon
              icon={faThumbsUp}
              style={{ marginRight: '1rem' }}
              onClick={e => {
                e.stopPropagation();
                console.log('clicked icon');
              }}
            />
            <FontAwesomeIcon icon={faThumbsDown} />
          </div>
          <div>
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="Edit">
              <EditIcon onClick={this.handleEditModal} />
            </IconButton>
          </div>
        </PostFooterContainer>
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
                value={heading}
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
                value={text}
                variant="outlined"
                onChange={e => {
                  this.setState({ text: e.target.value });
                }}
              />
              <ModalBtnContainer>
                <Button color="primary" onClick={this.editPost}>
                  Post
                </Button>
                <Button color="seconday" onClick={this.handleClose}>
                  Cancel
                </Button>
              </ModalBtnContainer>
            </div>
          </CenterContainer>
        </Modal>
      </div>
    );
  }
}

export default compose(graphql(editPost, { name: 'editPost' }))(PostFooter);
