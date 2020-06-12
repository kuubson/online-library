import styled from 'styled-components'

export default styled.p`
    color: red;
    font-size: 12px;
    margin-top: 10px;
    text-align: left;
    font-weight: bold;
    @media (max-width: 1000px) {
        font-size: 11px;
    }
    @media (max-width: 500px) {
        font-size: 10px;
    }
`
