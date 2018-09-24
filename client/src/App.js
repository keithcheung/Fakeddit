import React, { Component } from 'react';
import AppNavBar from './components/AppNavbar';
import PostListing from './components/PostListing';
import './index.css';
// FontAwesome

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppNavBar />
        <PostListing className="post-listing" />
      </div>
    );
  }
}

export default App;
