import { MESSAGES_FETCH_LIMIT } from '@online-library/tools'

import type { MessageType } from 'types'

export const isChatInitialLoad = (messages: MessageType[]) =>
   messages.length === MESSAGES_FETCH_LIMIT
