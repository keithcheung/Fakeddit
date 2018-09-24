import React, { Component } from 'react';
import AppNavBar from './components/AppNavbar';
import PostListing from './components/PostListing';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Test from './components/Test';
import './index.css';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
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
            <Route path="/about" component={Test} />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
