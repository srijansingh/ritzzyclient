import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import Ritzzy from "./containers/ritzzy/Ritzzy";
import "./App.css";

class App extends Component {
 
  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <Ritzzy/> 
        </div>
      </BrowserRouter>
  )}
}

export default App;
