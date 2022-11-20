import { ApolloProvider } from '@apollo/client'
import { Provider } from 'react-redux'
import type { RouteObject } from 'react-router-dom'
import { MemoryRouter, Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components'

import type { ReactFC } from '@online-library/core'
import { client, persistor, store, theme } from '@online-library/core'

// NOTE: must use relative paths, can't be absolute
// ------------------------------------------------
import { Guest, Loader, User } from '../../common'
import { Home, Login, PasswordReset, Registration, Support } from '../../guest'
import { Cart, Chat, Profile, Store } from '../../user'
import { Location } from '../Location/Location'

type ProvidersProps = ReactFC & { rtl?: boolean }

export const Providers = ({ children, rtl }: ProvidersProps) => (
   <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
         <ApolloProvider client={client()}>
            <ThemeProvider theme={theme}>
               {rtl ? (
                  <MemoryRouter>
                     {children}
                     <Location />
                  </MemoryRouter>
               ) : (
                  <>
                     <RouterProvider router={router} />
                     {children}
                  </>
               )}
            </ThemeProvider>
         </ApolloProvider>
      </PersistGate>
   </Provider>
)

const routes = [
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

const router = createBrowserRouter(routes as unknown as RouteObject[])

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
