import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { DefaultNavigatorOptions, EventMapBase, NavigationState } from '@react-navigation/native'
import React from 'react'

import {
   Screens as ScreensType,
   theme,
   useCart,
   useChatDetails,
   useRole,
} from '@online-library/core'

import { moderateScale } from 'styles'

import { TabBarIcon } from './shared/styled'

import { Guest, User } from './common'
import { Home } from './guest/Home/Home'
import { Login } from './guest/Login/Login'
import { Registration } from './guest/Registration/Registration'
import { Support } from './guest/Support/Support'
import { Cart } from './user/Cart/Cart'
import { Chat } from './user/Chat/Chat'
import { Profile } from './user/Profile/Profile'
import { Store } from './user/Store/Store'

export type NavigatorOptions = DefaultNavigatorOptions<
   ScreensType,
   NavigationState,
   {},
   EventMapBase
>

const screenOptions: NavigatorOptions['screenOptions'] = ({
   route,
}): BottomTabNavigationOptions => {
   const shouldHideTab = ['EmailSupport', 'PasswordSupport'].includes(route.name)
   return {
      headerShown: false,
      tabBarStyle: { backgroundColor: theme.colors.primary },
      tabBarLabelStyle: { display: 'none' },
      tabBarItemStyle: shouldHideTab ? { display: 'none' } : { justifyContent: 'center' },
      tabBarBadgeStyle: {
         backgroundColor: 'white',
         fontSize: moderateScale(10),
         marginLeft: moderateScale(10),
      },
      tabBarIcon: ({ focused }) => <TabBarIcon isFocused={focused}>{route.name}</TabBarIcon>,
   }
}

const Tab = createBottomTabNavigator<ScreensType>()

export const Screens = () => {
   const { role } = useRole()

   const { cart } = useCart()

   const { unreadMessagesAmount } = useChatDetails()

   return role === 'guest' ? (
      <Tab.Navigator initialRouteName="Home" screenOptions={screenOptions}>
         <Tab.Screen name="Home" component={HomeScreen} />
         <Tab.Screen name="Registration" component={RegistrationScreen} />
         <Tab.Screen name="Login" component={LoginScreen} />
         <Tab.Screen name="EmailSupport" component={EmailSupportScreen} />
         <Tab.Screen name="PasswordSupport" component={PasswordSupportScreen} />
      </Tab.Navigator>
   ) : (
      <Tab.Navigator initialRouteName="Store" screenOptions={screenOptions}>
         <Tab.Screen name="Store" component={StoreScreen} />
         <Tab.Screen name="Profile" component={ProfileScreen} />
         <Tab.Screen
            name="Cart"
            component={CartScreen}
            options={{
               ...(!!cart.length && { tabBarBadge: cart.length <= 99 ? cart.length : 99 }),
            }}
         />
         <Tab.Screen
            name="Chat"
            component={ChatScreen}
            options={({ navigation }) => ({
               ...(!navigation.isFocused() &&
                  unreadMessagesAmount && {
                     tabBarBadge: unreadMessagesAmount <= 99 ? unreadMessagesAmount : 99,
                  }),
            })}
         />
      </Tab.Navigator>
   )
}

const HomeScreen = () => (
   <Guest>
      <Home />
   </Guest>
)

const RegistrationScreen = () => (
   <Guest>
      <Registration />
   </Guest>
)

const LoginScreen = () => (
   <Guest>
      <Login />
   </Guest>
)

const EmailSupportScreen = () => (
   <Guest>
      <Support />
   </Guest>
)

const PasswordSupportScreen = () => (
   <Guest>
      <Support withPasswordSupport />
   </Guest>
)

const StoreScreen = () => (
   <User>
      <Store />
   </User>
)

const ProfileScreen = () => (
   <User>
      <Profile />
   </User>
)

const CartScreen = () => (
   <User>
      <Cart />
   </User>
)

const ChatScreen = () => (
   <User>
      <Chat />
   </User>
)
