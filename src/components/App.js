import React from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'

import Style from './Style/Style'
import Home from './Home/Home'
import Login from './Login/Login'
import Register from './Register/Register'

const AppWrapper = styled.div``;

const App = () => {
  return (
    <CookiesProvider>
      <AppWrapper>
        <Style />
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
          </Switch>
        </Router>
      </AppWrapper>
    </CookiesProvider>
  )
}

export default App