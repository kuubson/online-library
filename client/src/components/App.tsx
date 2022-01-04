import styled from 'styled-components/macro'
import { unstable_HistoryRouter as HistoryRouter, Routes, Route, Navigate } from 'react-router-dom'

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

import { history } from 'utils'

const AppContainer = styled.main`
    height: 100%;
`

const App = () => {
    const { loading } = useLoader()
    const { showApiFeedback } = useApiFeedback()
    return (
        <AppContainer>
            {loading && <Loader />}
            {showApiFeedback && <ApiFeedback />}
            <HistoryRouter history={history}>
                <Routes>
                    <Route path="/" element={<HomeRoute />} />
                    <Route path="/registration" element={<RegistrationRoute />} />
                    <Route path="/email-support" element={<EmailSupportRoute />} />
                    <Route path="/authentication/:token" element={<AuthenticationRoute />} />
                    <Route path="/login" element={<LoginRoute />} />
                    <Route path="/password-support" element={<PasswordSupportRoute />} />
                    <Route
                        path="/password-recovery/:passwordToken"
                        element={<PasswordRecoveryRoute />}
                    />
                    <Route path="/store" element={<StoreRoute />} />
                    <Route path="/profile" element={<ProfileRoute />} />
                    <Route path="/cart" element={<CartRoute />} />
                    <Route path="/chat" element={<ChatRoute />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </HistoryRouter>
        </AppContainer>
    )
}

export default App
