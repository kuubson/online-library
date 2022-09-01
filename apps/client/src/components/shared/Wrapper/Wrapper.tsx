import React from 'react'
import styled from 'styled-components'

import { useLoader, useApiFeedback } from 'hooks'

import Loader from 'components/shared/Loader/Loader'
import ApiFeedback from 'components/shared/ApiFeedback/ApiFeedback'

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
