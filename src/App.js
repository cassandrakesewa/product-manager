import React, { Component } from 'react';

import './App.css';
import NavBar from './components/Navigation/NavigationItems/NavigationItems';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
      </div>
    );
  }
}

export default App;
