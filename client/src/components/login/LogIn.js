import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { Alert } from 'reactstrap';

import styled from 'styled-components';

import { graphql, compose } from 'react-apollo';

import { addUser, signInUser } from '../../queries/queries';

const Form = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 10rem;
  margin: 5rem 10rem;
`;
/**
 * @class LogInContainer
 * Handles all functionality in /login route and handles user authorization
 */
class LogInContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      failLogin: false,
      failSignUp: false
    };
  }

  /**
   * Handles typing in the username field and updates state
   */
  handleUsernameChange = ({ target: event }) => {
    this.setState({ username: event.value });
  };

  /**
   * Handles typing in the password field and updates state
   */
  handlePasswordChange = ({ target: event }) => {
    this.setState({ password: event.value });
  };

  /**
   * Will handle the log in of a user and sets userId in sessionStorage 
   *  for future references
   */
  handleLogIn = () => {
    const { username, password } = this.state;
    this.props
      .signInUser({ variables: { username, password } })
      .then(response => {
        if (response.data.signInUser) {
          this.setState({ failLogin: false });
          sessionStorage.setItem('userId', response.data.signInUser.id);
          this.props.history.push('/');
        } else {
          this.setState({ failLogin: true });
        }
      })
      .catch(err => {
        console.log(`Error when logging in: ${err}`);
      });
  };

  /**
   * Adds user to the database and then pushes to a new route
   */
  handleSignUp = () => {
    const { username, password } = this.state;
    this.props
      .addUser({ variables: { username, password } })
      .then(response => {
        if (response.data.addUser) {
          this.setState({ failSignUp: false });
          this.props.history.push('/login');
        } else {
          this.setState({ failSignUp: true });
        }
      })
      .catch(err => {
        this.setState({ failSignUp: true });
        console.log(`Error when adding data to database`);
      });
  };

  render() {
    const { signingUp } = this.props;
    const { failLogin, failSignUp } = this.state;

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
        {failLogin && (
          <Alert color="danger" fade={true}>
            Invalid username and password
          </Alert>
        )}
        {failSignUp && (
          <Alert color="danger" fade={true}>
            Username already exists
          </Alert>
        )}
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

export default compose(
  graphql(addUser, { name: 'addUser' }),
  graphql(signInUser, { name: 'signInUser' })
)(withRouter(LogInContainer));
