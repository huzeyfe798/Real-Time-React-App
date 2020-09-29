import React,{Component} from 'react';
import {BrowserRouter, Route , Switch} from 'react-router-dom';

import Home from './components/Home';
import './bootstrap.min.css'
import './App.css';
import CoinDetail from "./components/CoinDetail";






class App extends Component{
  render(){
    return(
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={Home}></Route>

            <Route exact path="/coinDetail/:coinSymbol" component={CoinDetail}></Route>
          </Switch>
        </div>
      </BrowserRouter>

    );
  }
}

export default App;



