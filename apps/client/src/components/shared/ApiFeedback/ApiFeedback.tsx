import styled from 'styled-components'

import { LoaderContainer } from 'components/shared/Loader/Loader'

import * as Styled from './styled'

import { fadeIn } from 'assets/animations'

import { useApiFeedback } from 'hooks'

import { setApiFeedback } from 'helpers'

const ApiFeedbackContainer = styled(LoaderContainer)`
    flex-direction: column;
    animation: ${fadeIn} 0.5s ease-in-out;
    z-index: 6;
`

const ApiFeedback = () => {
    const { header, message, buttonText, callback } = useApiFeedback()
    const handleOnClick = () => {
        callback()
        setApiFeedback('', '', '')
    }
    return (
        <ApiFeedbackContainer>
            <Styled.HeaderContainer>
                <Styled.Header>{header}</Styled.Header>
                <Styled.Message>{message}</Styled.Message>
            </Styled.HeaderContainer>
            <Styled.Button onClick={handleOnClick}>{buttonText}</Styled.Button>
        </ApiFeedbackContainer>
    )
}

export default ApiFeedback
