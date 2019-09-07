import React from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import { useSelector } from 'react-redux'

// import Home from './Home/Home'
import Login from './Login/Login'
import Register from './Register/Register'
import Store from './Store/Store'
import Profile from './Profile/Profile'
import Cart from './Cart/Cart'
import Loader from './Loader/Loader'
import ApiResponses from './ApiResponses/ApiResponses'
import BookUploader from './BookUploader/BookUploader'

const AppWrapper = styled.div``;

const App = () => {
    const isLoading = useSelector(state => state.global.isLoading)
    const apiResponseSuccessMessage = useSelector(state => state.api.apiResponseSuccessMessage)
    const apiResponseErrorMessage = useSelector(state => state.api.apiResponseErrorMessage)
    const apiResponseWarningMessage = useSelector(state => state.api.apiResponseWarningMessage)
    const shouldBookUploaderAppear = useSelector(state => state.global.shouldBookUploaderAppear)
    return (
        <CookiesProvider>
            <AppWrapper>
                <Router>
                    <Switch>
                        <Route path='/login' component={Login} />
                        <Route path='/register' component={Register} />
                        <Route path='/store' component={Store} />
                        <Route path='/profile' component={Profile} />
                        <Route path='/cart' component={Cart} />
                    </Switch>
                </Router>
                {isLoading && <Loader />}
                {shouldBookUploaderAppear && <BookUploader />}
                {(apiResponseSuccessMessage || apiResponseErrorMessage || apiResponseWarningMessage) && <ApiResponses />}
            </AppWrapper>
        </CookiesProvider>
    )
}

export default App