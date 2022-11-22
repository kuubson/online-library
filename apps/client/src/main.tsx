import React from 'react'
import { createRoot } from 'react-dom/client'

import { Providers } from 'components/shared'

createRoot(document.getElementById('root') as HTMLElement).render(
   <React.StrictMode>
      <Providers>
         <></>
      </Providers>
   </React.StrictMode>
)
