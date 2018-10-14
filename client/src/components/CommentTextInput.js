import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import { addComment, getComment } from '../queries/queries';
import { graphql, compose } from 'react-apollo';

// CommentTextInput
class CommentTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: '',
      toggle: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    const { response } = this.state;
    const { id } = this.props;
    const name = 'kcheung41';
    const newComment = {
      response,
      id,
      name
    };

    this.props.onConfirm(newComment);
  }

  handleTextChange = event => {
    this.setState({
      response: event.target.value
    });
  };

  render() {
    return (
      <Row>
        <Col xs="10">
          <TextField
            fullWidth={true}
            id="standard-multiline-flexible"
            label="reply"
            multiline
            rowsMax="4"
            onChange={e => this.handleTextChange(e)}
          />
        </Col>
        <Col xs="2">
          <Button color="info" size="sm" onClick={this.handleSubmit}>
            post
          </Button>
        </Col>
      </Row>
    );
  }
}

CommentTextInput.propTypes = {
  id: PropTypes.string
};

export default graphql(addComment, { name: 'addComment' })(CommentTextInput);
