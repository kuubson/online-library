import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'

import Style from './Style/Style'
import Home from './Home/Home'
import Login from './Login/Login'
import Register from './Register/Register'
import Store from './Store/Store'
import Profile from './Profile/Profile'
import Cart from './Cart/Cart'
import BookUploader from '../sharedComponents/BookUploader/BookUploader'
import Loader from '../sharedComponents/Loader/Loader';

const AppWrapper = styled.div``;

const App = () => {
  const isLoading = useSelector(state => state.global.isLoading)
  const shouldBookUploaderAppear = useSelector(state => state.global.shouldBookUploaderAppear)
  return (
    <CookiesProvider>
      <AppWrapper>
        <Style />
        {shouldBookUploaderAppear && <BookUploader />}
        {isLoading && <Loader />}
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/store' component={Store} />
            <Route path='/profile' component={Profile} />
            <Route path='/cart' component={Cart} />
          </Switch>
        </Router>
      </AppWrapper>
    </CookiesProvider>
  )
}

export default App