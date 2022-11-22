import { ApolloProvider } from '@apollo/client'
import { Provider } from 'react-redux'
import { MemoryRouter, Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components'

import type { ReactFC, Router } from '@online-library/core'
import { client, persistor, store, theme } from '@online-library/core'

import 'styles/index.scss'

// NOTE: must use relative paths, can't be absolute
// ------------------------------------------------
import { Guest, Loader, Location, User } from '../../common'
import { Home, Login, PasswordReset, Registration, Support } from '../../guest'
import { Cart, Chat, Profile, Store } from '../../user'

const routes: Router = {
   '/': <Home />,
   '/registration': (
      <Guest>
         <Registration />
      </Guest>
   ),
   '/email-support': (
      <Guest>
         <Support />
      </Guest>
   ),
   '/login': (
      <Guest>
         <Login />
      </Guest>
   ),
   '/password-support': (
      <Guest>
         <Support withPasswordSupport />
      </Guest>
   ),
   '/password-recovery/:passwordToken': (
      <Guest>
         <PasswordReset />
      </Guest>
   ),
   '/store': (
      <User>
         <Store />
      </User>
   ),
   '/profile': (
      <User>
         <Profile />
      </User>
   ),
   '/cart': (
      <User>
         <Cart />
      </User>
   ),
   '/chat': (
      <User>
         <Chat />
      </User>
   ),
   '*': <Navigate to="/" />,
}

const router = createBrowserRouter(
   Object.keys(routes).map(path => ({
      path,
      element: routes[path as keyof typeof routes],
   }))
)

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

window.navigate = path => router.navigate(path)

window.goBack = () => router.navigate(-1)
