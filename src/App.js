import React, { Component } from 'react';
import { withAuthenticator } from 'aws-amplify-react';

import Header from './Header';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
      </div>
    );
  }
}

export default App;
