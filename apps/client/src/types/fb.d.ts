type FBType = any

type FBLoginRequest = {
   authResponse: {
      userID: string
      signedRequest: string
      expiresIn: string
      accessToken: string
   }
   status: 'connected' | 'not_authorized'
}

type FBMeRespose = {
   first_name: string
   email: string
}
