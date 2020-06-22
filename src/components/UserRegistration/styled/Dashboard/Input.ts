import styled from 'styled-components/macro'

export default styled.input`
    width: 100%;
    font-size: 13px;
    padding-bottom: 12px;
    border-bottom: 1.5px solid white;
    text-align: 2px;
    ::placeholder {
        color: white;
    }
    @media (max-width: 1000px) {
        font-size: 12px;
    }
    @media (max-width: 500px) {
        font-size: 11px;
    }
`
