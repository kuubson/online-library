/* eslint-disable @typescript-eslint/no-empty-interface */

/* eslint-disable @typescript-eslint/no-namespace */
import type { Screens } from '@online-library/core'

declare global {
   namespace ReactNavigation {
      interface RootParamList extends Screens {}
   }
}
