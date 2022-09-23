import type { MessageType } from '@online-library/config'
import { MESSAGES_FETCH_LIMIT } from '@online-library/config'

export const isChatInitialLoad = (messages: MessageType[]) =>
   messages.length === MESSAGES_FETCH_LIMIT
