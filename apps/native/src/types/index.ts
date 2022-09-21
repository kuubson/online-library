/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */
declare global {
   namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
   }
}

export type RootStackParamList = {
   Home: undefined
   Login: undefined
   Registration: undefined
   EmailSupport: undefined
}
