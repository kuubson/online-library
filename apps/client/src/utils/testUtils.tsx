import type { RenderOptions } from '@testing-library/react'
import { render as _render } from '@testing-library/react'
import type { ReactElement } from 'react'

import { Providers } from 'components/shared'

import { baseUrl, defaultAxios } from 'utils'

export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'

defaultAxios.defaults.baseURL = baseUrl

type Options = Omit<RenderOptions, 'wrapper'>

export const render = (ui: ReactElement, options?: Options) =>
   _render(ui, {
      wrapper: Providers,
      ...options,
   })
