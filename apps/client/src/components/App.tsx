import { Navigate, Route, Routes } from 'react-router-dom'
import styled from 'styled-components/macro'

import { ApiFeedback, Loader, Location } from 'components/shared'

import { Home } from 'components/guest/Home/Home'
import { Login } from 'components/guest/Login/Login'
import { PasswordRecovery } from 'components/guest/PasswordRecovery/PasswordRecovery'
import { Registration } from 'components/guest/Registration/Registration'
import { Support } from 'components/guest/Support/Support'
import { Cart } from 'components/user/Cart/Cart'
import { Chat } from 'components/user/Chat/Chat'
import { Profile } from 'components/user/Profile/Profile'
import { Store } from 'components/user/Store/Store'

import { useApiFeedback, useLoader } from 'hooks'

import type { FBType } from 'types'

import { Guest, User } from './common'

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
         <Routes>
            <Route
               path="/home"
               element={
                  <Guest>
                     <Home />
                  </Guest>
               }
            />
            <Route
               path="/registration"
               element={
                  <Guest>
                     <Registration />
                  </Guest>
               }
            />
            <Route
               path="/email-support"
               element={
                  <Guest>
                     <Support />
                  </Guest>
               }
            />
            <Route
               path="/login"
               element={
                  <Guest>
                     <Login />
                  </Guest>
               }
            />
            <Route
               path="/password-support"
               element={
                  <Guest>
                     <Support withPasswordSupport />
                  </Guest>
               }
            />
            <Route
               path="/password-recovery/:passwordToken"
               element={
                  <Guest>
                     <PasswordRecovery />
                  </Guest>
               }
            />
            <Route
               path="/store"
               element={
                  <User>
                     <Store />
                  </User>
               }
            />
            <Route
               path="/profile"
               element={
                  <User>
                     <Profile />
                  </User>
               }
            />
            <Route
               path="/cart"
               element={
                  <User>
                     <Cart />
                  </User>
               }
            />
            <Route
               path="/chat"
               element={
                  <User>
                     <Chat />
                  </User>
               }
            />
            <Route path="*" element={<Navigate to="/home" />} />
         </Routes>
         <Location data-testid="location" />
      </AppContainer>
   )
}

const AppContainer = styled.main`
   height: 100%;
`
