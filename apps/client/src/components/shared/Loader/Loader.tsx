import styled from 'styled-components'

import * as Styled from './styled'

export const LoaderContainer = styled.section`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(3px);
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 5;
`

const Loader = () => {
    return (
        <LoaderContainer>
            <Styled.Circle>
                <Styled.Dot />
                <Styled.Dot />
                <Styled.Dot />
                <Styled.Dot />
                <Styled.Dot />
                <Styled.Dot />
            </Styled.Circle>
        </LoaderContainer>
    )
}

export default Loader
