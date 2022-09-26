import { Guest, User } from './common'
import { Home } from './guest/Home/Home'
import { Login } from './guest/Login/Login'
import { Registration } from './guest/Registration/Registration'
import { Support } from './guest/Support/Support'
import { Profile } from './user/Profile/Profile'
import { Store } from './user/Store/Store'

export const HomeScreen = () => (
   <Guest>
      <Home />
   </Guest>
)

export const RegistrationScreen = () => (
   <Guest>
      <Registration />
   </Guest>
)

export const LoginScreen = () => (
   <Guest>
      <Login />
   </Guest>
)

export const EmailSupportScreen = () => (
   <Guest>
      <Support />
   </Guest>
)

export const PasswordSupportScreen = () => (
   <Guest>
      <Support withPasswordSupport />
   </Guest>
)

export const StoreScreen = () => (
   <User>
      <Store />
   </User>
)

export const ProfileScreen = () => (
   <User>
      <Profile />
   </User>
)
