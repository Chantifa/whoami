import logo from './img/logo.png';
import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  useEffect(() => {
    const fetchData = async () => {
      
      const json = await fetch("/express_backend").then(r =>r.json()).catch(e => console.error(e))
      console.log(json)
    }

    fetchData()
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
