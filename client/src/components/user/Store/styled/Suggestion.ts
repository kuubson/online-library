import styled from 'styled-components'

export const Suggestion = styled.li`
    color: black;
    padding: 15px;
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
    @media (max-width: 1200px) {
        font-size: 13px;
    }
    @media (max-width: 900px) {
        font-size: 12px;
    }
    @media (max-width: 600px) {
        font-size: 11px;
    }
`
