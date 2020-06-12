import styled from 'styled-components'

export default styled.button`
    font-size: 14px;
    padding: 10px 40px;
    margin: 45px auto 0px auto;
    border: 1.5px solid white;
    transition: transform 0.3s ease-in-out;
    :hover {
        transform: scale(1.03);
    }
    @media (max-width: 1000px) {
        font-size: 13px;
    }
    @media (max-width: 500px) {
        font-size: 12px;
    }
`
