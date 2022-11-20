import type { RouteObject } from 'react-router-dom'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import styled from 'styled-components/macro'

import { useApiFeedback, useLoader } from '@online-library/core'

import 'styles/index.scss'

// NOTE: it must be a relative import
import { GlobalStyle } from '../styles'
// NOTE: -------------------------------
import { ApiFeedback, Guest, Loader, User } from './common'
import { Home, Login, PasswordReset, Registration, Support } from './guest'
import { Location } from './shared'
import { Cart, Chat, Profile, Store } from './user'

export const routes = [
   {
      path: '/',
      element: <Home />,
   },
   {
      path: '/registration',
      element: (
         <Guest>
            <Registration />
         </Guest>
      ),
   },
   {
      path: '/email-support',
      element: (
         <Guest>
            <Support />
         </Guest>
      ),
   },
   {
      path: '/login',
      element: (
         <Guest>
            <Login />
         </Guest>
      ),
   },
   {
      path: '/password-support',
      element: (
         <Guest>
            <Support withPasswordSupport />
         </Guest>
      ),
   },
   {
      path: '/password-recovery/:passwordToken',
      element: (
         <Guest>
            <PasswordReset />
         </Guest>
      ),
   },
   {
      path: '/store',
      element: (
         <User>
            <Store />
         </User>
      ),
   },
   {
      path: '/profile',
      element: (
         <User>
            <Profile />
         </User>
      ),
   },
   {
      path: '/cart',
      element: (
         <User>
            <Cart />
         </User>
      ),
   },
   {
      path: '/chat',
      element: (
         <User>
            <Chat />
         </User>
      ),
   },
   {
      path: '*',
      element: <Navigate to="/" />,
   },
] as const

export const router = createBrowserRouter(routes as unknown as RouteObject[])

export const App = () => {
   const { loading } = useLoader()

   const { showApiFeedback } = useApiFeedback()

   return (
      <AppContainer>
         <GlobalStyle />
         {loading && <Loader />}
         {showApiFeedback && <ApiFeedback />}
         <RouterProvider router={router} />
         <Location />
      </AppContainer>
   )
}

const AppContainer = styled.main`
   height: 100%;
`

export type WindowType = {
   navigate: typeof navigate
   goBack: typeof goBack
}

declare global {
   // eslint-disable-next-line @typescript-eslint/no-empty-interface
   interface Window extends WindowType {}
}

export type RouterPath = Exclude<typeof routes[number]['path'], '*'>

const navigate = (path: RouterPath) => router.navigate(path)

const goBack = () => router.navigate(-1)

window.navigate = navigate
window.goBack = goBack
