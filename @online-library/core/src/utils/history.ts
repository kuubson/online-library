import type { BrowserHistory } from 'history'
import { createBrowserHistory } from 'history'

import { isNative } from 'utils'

export const history = (!isNative && createBrowserHistory()) as BrowserHistory
