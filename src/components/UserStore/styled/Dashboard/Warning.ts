import styled from 'styled-components/macro'

export default styled.p`
    font-size: 20px;
    font-weight: bold;
    @media (max-width: 1200px) {
        font-size: 18px;
    }
    @media (max-width: 900px) {
        font-size: 16px;
    }
    @media (max-width: 600px) {
        font-size: 14px;
    }
`
