import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import { addComment } from '../../queries/queries';
import { graphql } from 'react-apollo';

/**
 * @class CommentTextInput
 * Upon clicking reply this component is shown to handle posting another comment 
 */
class CommentTextInput extends Component {
  constructor(props) {
    super(props);
    this.setState({
      response: '',
      toggle: false
    });
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
          <Button className='response_btns' color="info" size="sm" onClick={this.handleSubmit}>
            post
          </Button>
          <Button className='response_btns' color="secondary" size="sm" onClick={this.props.onCancel}>
            cancel
          </Button>
        </Col>
      </Row>
    );
  }
}

CommentTextInput.propTypes = {
  id: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func
};

export default graphql(addComment, { name: 'addComment' })(CommentTextInput);
