import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './Search';
import data from './data';
import sortedData from './sortedData';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Search data={data} sortedData={sortedData} />
      </div>
    );
  }
}

export default App;
