import React, { Component } from 'react';
import AppNavBar from './components/AppNavbar';
import PostListing from './components/post/PostListing';
import LogInContainer from './components/login/LogIn';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Post from './components/post/Post';
import './index.css';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache
});
// FontAwesome

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div>
            <AppNavBar />
            <Route exact path="/" component={PostListing} />
            <Route path="/post/:postId" component={Post} />
            <Route exact path="/login" component={LogInContainer} />
            <Route
              exact
              path="/signup"
              render={() => <LogInContainer signingUp={true} />}
            />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
