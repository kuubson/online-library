import * as getMessages from './getMessages'
import * as sendMessage from './sendMessage'
import * as sendFile from './sendFile'
import * as subscribePushNotifications from './subscribePushNotifications'
import * as getUnreadMessagesInfo from './getUnreadMessagesInfo'

const chat = {
    getMessages,
    sendMessage,
    sendFile,
    subscribePushNotifications,
    getUnreadMessagesInfo
}

export default chat
