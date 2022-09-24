import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components/native'

import type { ReactChildren } from '@online-library/core'
import { persistor, store } from '@online-library/core'

import { theme } from '@online-library/ui'

import { Loader } from 'components/common'

export const Providers = ({ children }: ReactChildren) => (
   <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
         <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </PersistGate>
   </Provider>
)