import { Guest } from 'components/common'
import { Home } from 'components/guest/Home/Home'
import { Login } from 'components/guest/Login/Login'
import { Registration } from 'components/guest/Registration/Registration'

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
