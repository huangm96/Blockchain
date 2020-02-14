import React from 'react';
import './App.css';
import {Route} from "react-router-dom"
import Login from "./components/Login"
import Wallet from "./components/Wallet"
function App() {
  return (
    <div className="App">
      <h1> Lambda Mine</h1>
      <Route exact path="/" component={Login}/>
      <Route path="/main" component={Wallet}/>
    </div>
  );
}

export default App;
