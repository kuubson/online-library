import { AppRegistry, Platform } from 'react-native'
import PushNotification from 'react-native-push-notification'

import { Actions } from 'react-native-router-flux'

PushNotification.configure({
    onNotification: () => {
        PushNotification.removeAllDeliveredNotifications()
        Actions.UserChat()
    },
    requestPermissions: Platform.OS === 'ios'
})

PushNotification.createChannel({
    channelId: 'messages',
    channelName: 'messages'
})

import App from 'components/App'

import { name } from './app.json'

AppRegistry.registerComponent(name, () => App)
