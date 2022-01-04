import styled from 'styled-components'

export default styled.textarea`
    width: 100%;
    height: 100%;
    background: transparent;
    padding: 10px 15px;
    border: none;
    resize: none;
    ::placeholder {
        color: white;
    }
    ::-webkit-scrollbar {
        display: none;
    }
    @media (max-width: 800px) {
        font-size: 11px;
        letter-spacing: 1px;
    }
`
