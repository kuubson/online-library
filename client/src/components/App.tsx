import { unstable_HistoryRouter as HistoryRouter, Navigate, Route, Routes } from 'react-router-dom'

import styled from 'styled-components/macro'

import { ApiFeedback, Loader } from 'components/shared'

import { useApiFeedback, useLoader } from 'hooks'

import { history } from 'utils'

import {
   AuthenticationRoute,
   CartRoute,
   ChatRoute,
   EmailSupportRoute,
   HomeRoute,
   LoginRoute,
   PasswordRecoveryRoute,
   PasswordSupportRoute,
   ProfileRoute,
   RegistrationRoute,
   StoreRoute,
} from './routes'

declare global {
   interface Window {
      FB: FBType
   }
}

export const App = () => {
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

const AppContainer = styled.main`
   height: 100%;
`
