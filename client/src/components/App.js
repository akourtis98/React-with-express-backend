import React, { Component } from 'react';
import Header from './Nav/Header';
import Footer from './Nav/Footer';
import Routes from './Routes/Routes';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Routes />
        <Footer />
      </div>
    )
  }
}

export default App;
