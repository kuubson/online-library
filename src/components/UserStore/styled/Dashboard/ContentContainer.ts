import styled from 'styled-components/macro'

export default styled.div`
    width: 60%;
    height: 70%;
    background: white;
    padding: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 1150px) {
        width: 55%;
        height: 80%;
        flex-direction: column;
    }
    @media (max-width: 900px) {
        width: 80%;
        height: 80%;
    }
    @media (max-width: 600px) {
        width: 90%;
        height: 90%;
    }
`
