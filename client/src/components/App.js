import React, { Component } from 'react';
import Header from './Nav/Header';
import Footer from './Nav/Footer';
import Main from './Routes/Main';

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
