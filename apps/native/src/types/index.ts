/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */

export type RootStackParamList = {
   Home: undefined
   Login: undefined
   Registration: undefined
}

declare global {
   namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
   }
}
