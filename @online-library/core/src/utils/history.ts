import type { BrowserHistory } from 'history'
import { createBrowserHistory } from 'history'

import { isWeb } from 'isWeb'

export const history = (isWeb && createBrowserHistory()) as BrowserHistory
