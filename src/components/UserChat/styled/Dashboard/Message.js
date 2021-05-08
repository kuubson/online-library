import styled from 'styled-components/macro'

export default styled.div`
    width: max-content;
    padding: 8px 10px;
    margin-bottom: 8px;
    font-size: 15px;
    border-radius: 12px;
    color: white;
    background: rgba(0, 136, 255, 0.5);
    align-self: flex-end;
    position: relative;
    @media (max-width: 1000px) {
        font-size: 14px;
    }
    @media (max-width: 700px) {
        font-size: 13px;
    }
`
