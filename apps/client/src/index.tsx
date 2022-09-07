/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createRoot } from 'react-dom/client'

import 'styles/index.scss'

import { Providers } from 'components/shared'

import { App } from 'components/App'

import * as serviceWorkerRegistration from './serviceWorkerRegistration'

const app = document.getElementById('app')!

createRoot(app).render(
   <Providers>
      <App />
   </Providers>
)

serviceWorkerRegistration.register({
   onUpdate: async registration => {
      await registration.unregister()
      window.location.reload()
   },
})
