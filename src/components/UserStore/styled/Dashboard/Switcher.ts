import styled from 'styled-components/macro'

export default styled.button`
    font-size: 11px;
    color: black;
    padding: 6px 18px;
    white-space: nowrap;
    background: white;
    position: absolute;
    bottom: 5px;
    right: 0px;
    :hover {
        transform: none;
    }
    @media (max-width: 1000px) {
        font-size: 10px;
    }
    @media (max-width: 500px) {
        font-size: 9px;
        padding: 6px 16px;
    }
`
