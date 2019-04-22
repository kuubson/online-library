import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/home/Home'
import Login from './components/login/Login'
import Register from './components/register/Register'
import Account from './components/account/Account';
import Profile from './components/account/Profile';
import Cart from './components/cart/Cart';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/account" component={Account} />
          <Route path="/profile" component={Profile} />
          <Route path="/cart" component={Cart} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
