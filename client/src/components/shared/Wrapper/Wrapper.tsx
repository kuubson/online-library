import React from 'react'
import styled from 'styled-components'

import ApiFeedback from 'components/shared/ApiFeedback/ApiFeedback'
import Loader from 'components/shared/Loader/Loader'

import { useApiFeedback, useLoader } from 'hooks'

const WrapperContainer = styled.section`
   height: 100%;
`

const Wrapper: React.FC = ({ children }) => {
   const { loading } = useLoader()
   const { showApiFeedback } = useApiFeedback()
   return (
      <WrapperContainer>
         {loading && <Loader />}
         {showApiFeedback && <ApiFeedback />}
         {children}
      </WrapperContainer>
   )
}

export default Wrapper
