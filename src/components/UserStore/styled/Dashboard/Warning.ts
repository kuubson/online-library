import styled from 'styled-components/macro'

export default styled.p`
    max-width: 315px;
    font-size: 18px;
    line-height: 1.5;
    @media (max-width: 1200px) {
        font-size: 17px;
    }
    @media (max-width: 900px) {
        font-size: 16px;
    }
    @media (max-width: 600px) {
        font-size: 15px;
    }
`
