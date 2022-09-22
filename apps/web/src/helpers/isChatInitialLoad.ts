import { MESSAGES_FETCH_LIMIT } from '@online-library/core'

import type { MessageType } from 'types'

export const isChatInitialLoad = (messages: MessageType[]) =>
   messages.length === MESSAGES_FETCH_LIMIT
