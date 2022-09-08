import { User } from 'database'

export const seedUser = async () => {
   const user = await User.create({
      name: 'John',
      email: 'onlinelibraryapplication@gmail.com',
      password: 'testing',
   })
   await user.createAuthentication({
      activationToken: '5t6q8wu9hodsng67et7tsdft867tdf76tsd',
      authenticated: true,
   })
}
