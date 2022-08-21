import React from 'react'

import styled from 'styled-components/macro'

import { ApiFeedback, Loader } from 'components/shared'

import { useApiFeedback, useLoader } from 'hooks'

export const Wrapper: React.FC = ({ children }) => {
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

const WrapperContainer = styled.section`
   height: 100%;
`
