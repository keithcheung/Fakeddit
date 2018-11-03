import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

const Form = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 10rem;
  margin: 5rem 10rem;
`;

class LogInContainer extends Component {
  render() {
    return (
      <Form>
        <CardContent style={{ width: '100%' }}>
          <TextField
            required
            id="standard-required"
            fullWidth={true}
            label="Username"
            placeholder="Please enter your username"
            margin="normal"
          />
        </CardContent>
        <CardContent style={{ width: '100%' }}>
          <TextField
            required
            type="password"
            id="standard-required"
            fullWidth={true}
            label="Password"
            placeholder="Please enter your Password"
            margin="normal"
          />
        </CardContent>
        <CardActions>
          <Button size="medium" color="primary">
            Log in
          </Button>
          <Button size="medium" color="secondary">
            Sign up
          </Button>
        </CardActions>
      </Form>
    );
  }
}

export default LogInContainer;
