import React, { Component } from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './components/home/Home'
import Login from './components/login/Login'
import Register from './components/register/Register'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
