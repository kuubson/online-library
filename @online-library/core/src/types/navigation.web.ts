declare global {
   interface Window {
      navigate: (path: RouterPath) => void
      goBack: () => void
   }
}

export type RouterPath =
   | '/'
   | '/registration'
   | '/email-support'
   | '/login'
   | '/password-support'
   | '/password-recovery'
   | '/store'
   | '/profile'
   | '/cart'
   | '/chat'

export type Router = Record<RouterPath | '*', JSX.Element>
