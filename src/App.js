import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Account from './components/Account';
import Profile from './components/profile/Profile'
import Cart from './components/cart/Cart'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/account" component={Account} />
          <Route path="/profile" component={Profile} />
          <Route path="/cart" component={Cart} />
        </Switch>
      </Router>
    );
  }
}

export default App;
