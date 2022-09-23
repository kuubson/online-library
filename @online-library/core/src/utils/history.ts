import type { BrowserHistory } from 'history'
import { createBrowserHistory } from 'history'

import { isWeb } from '@online-library/tools'

export const history = (isWeb && createBrowserHistory()) as BrowserHistory
