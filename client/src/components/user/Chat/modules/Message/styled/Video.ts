import styled from 'styled-components'

export const Video = styled.video`
    height: 400px;
    max-width: 700px;
    border-radius: 12px;
    @media (max-width: 800px) {
        height: 300px;
        max-width: 70vw;
    }
    @media (max-width: 600px) {
        height: 280px;
    }
`
