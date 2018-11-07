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
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleUsernameChange = ({ target: event }) => {
    this.setState({ username: event.value });
  };

  handlePasswordChange = ({ target: event }) => {
    this.setState({ password: event.value });
  };

  handleLogIn = () => {
    const { username, password } = this.state;
    // figure out what to do from here
    //  mutate here, get id, store it in localStorage
  };

  handleSignUp = () => {
    const { username, password } = this.state;
    // figure out what to do with it from there
    //  mutate sign up
  };

  render() {
    const { signingUp } = this.props;
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
            onChange={this.handleUsernameChange}
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
            onChange={this.handlePasswordChange}
          />
        </CardContent>
        <CardActions>
          {signingUp ? (
            <Button size="medium" color="primary" onClick={this.handleSignUp}>
              Sign up
            </Button>
          ) : (
            <div>
              <Button size="medium" color="primary" onClick={this.handleLogIn}>
                Log in
              </Button>
              <Button size="medium" color="secondary" href="/signup">
                Sign up
              </Button>
            </div>
          )}
        </CardActions>
      </Form>
    );
  }
}

export default LogInContainer;
