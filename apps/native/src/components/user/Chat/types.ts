import type { RefObject } from 'react'
import type { NativeScrollEvent, NativeSyntheticEvent, ScrollView, View } from 'react-native'

import type { MessageType } from '@online-library/config'

export type MessagesProps = {
   ref: RefObject<ScrollView>
   endOfMessages: RefObject<View>
   lastMessageBeforeFetch: RefObject<View>
   messages: MessageType[]
   currentUserId: string | undefined
   onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
   scrollToLastMessage: (delay: number) => void
   onContentSizeChange: (_: number, h: number) => void
}
