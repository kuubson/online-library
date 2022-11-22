import { useApiFeedback, useLoader } from '@online-library/core'

import { GlobalStyle } from 'styles'
import 'styles/index.scss'

import { ApiFeedback, Loader } from './common'

export const App = () => {
   const { loading } = useLoader()

   const { showApiFeedback } = useApiFeedback()

   return (
      <>
         <GlobalStyle />
         {loading && <Loader />}
         {showApiFeedback && <ApiFeedback />}
      </>
   )
}
