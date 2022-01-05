import * as getMessages from './getMessages'
import * as sendMessage from './sendMessage'
import * as sendFile from './sendFile'
import * as subscribePushNotifications from './subscribePushNotifications'
import * as getMessagesInfo from './getMessagesInfo'

const chat = {
    getMessages,
    sendMessage,
    sendFile,
    subscribePushNotifications,
    getMessagesInfo
}

export default chat
