import React, { Component } from 'react';
import Header from './nav/Header';
import Footer from './nav/Footer';
import Main from './Main';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    )
  }
}

export default App;
