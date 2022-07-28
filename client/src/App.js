/* eslint-disable react/button-has-type */
import React from 'react';
import './App.css';

import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <button type="button" className="btn btn-primary">Button</button>
    </div>
  );
}

export default App;
