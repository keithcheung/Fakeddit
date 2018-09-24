import React, { Component } from 'react';
import AppNavBar from './components/AppNavbar';
import PostListing from './components/PostListing';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Test from './components/Test';
import './index.css';
// FontAwesome

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <AppNavBar />
          <Route exact path="/" component={PostListing} />
          <Route path="/about" component={Test} />
        </div>
      </Router>
    );
  }
}

export default App;
