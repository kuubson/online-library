import styled from 'styled-components/macro'
import { Routes, Route, Navigate } from 'react-router-dom'

import Loader from 'components/shared/Loader/Loader'
import ApiFeedback from 'components/shared/ApiFeedback/ApiFeedback'

import {
    HomeRoute,
    RegistrationRoute,
    EmailSupportRoute,
    AuthenticationRoute,
    LoginRoute,
    PasswordSupportRoute,
    PasswordRecoveryRoute,
    StoreRoute,
    ProfileRoute,
    CartRoute,
    ChatRoute
} from './routes'

import { useLoader, useApiFeedback } from 'hooks'

const AppContainer = styled.main`
    min-height: 100%;
`

const App = () => {
    const { loading } = useLoader()
    const { showApiFeedback } = useApiFeedback()
    return (
        <AppContainer>
            {loading && <Loader />}
            {showApiFeedback && <ApiFeedback />}
            <Routes>
                <Route path="/" element={<HomeRoute />} />
                <Route path="/user/registration" element={<RegistrationRoute />} />
                <Route path="/user/email-support" element={<EmailSupportRoute />} />
                <Route path="/user/authentication/:token" element={<AuthenticationRoute />} />
                <Route path="/user/login" element={<LoginRoute />} />
                <Route path="/user/password-support" element={<PasswordSupportRoute />} />
                <Route
                    path="/user/password-recovery/:passwordToken"
                    element={<PasswordRecoveryRoute />}
                />
                <Route path="/user/store" element={<StoreRoute />} />
                <Route path="/user/profile" element={<ProfileRoute />} />
                <Route path="/user/cart" element={<CartRoute />} />
                <Route path="/user/chat" element={<ChatRoute />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </AppContainer>
    )
}

export default App
