import type { BrowserHistory } from 'history'
import { createBrowserHistory } from 'history'

import { isWeb } from '@online-library/config'

export const history = (isWeb && createBrowserHistory()) as BrowserHistory
