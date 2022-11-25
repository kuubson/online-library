import React from 'react'
import { createRoot } from 'react-dom/client'

import { Providers } from 'components/shared'

import { App } from 'components/App'

createRoot(document.getElementById('root') as HTMLElement).render(
   <React.StrictMode>
      <Providers>
         <App />
      </Providers>
   </React.StrictMode>
)
