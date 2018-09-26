import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import { addComment, getComment } from '../queries/queries';
import { graphql, compose } from 'react-apollo';

class CommentTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    const { response } = this.state;
    debugger;
    const { id } = this.props;
    const name = 'kcheung41';
    this.props.handleComment();
    // this.props.addComment({
    //   variables: { name: name, uid: id, text: response },
    //   refetchQueries: [{ query: getComment }],
    //   awaitRefetchQueries: true
    // });
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

export default graphql(addComment, { name: 'addComment' })(CommentTextInput);
