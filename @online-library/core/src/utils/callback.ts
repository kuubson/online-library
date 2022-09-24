import { isWeb } from '@online-library/config'

type CallbackProps = {
   web: () => void
   native: () => void
}

export const callback = ({ web, native }: CallbackProps) => {
   if (isWeb) {
      return web()
   }
   native()
}
