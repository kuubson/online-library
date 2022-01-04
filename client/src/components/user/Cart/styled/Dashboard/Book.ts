import styled from 'styled-components'

export default styled.li`
    font-size: 15px;
    margin-bottom: 25px;
    :last-of-type {
        margin-bottom: 0px;
    }
    @media (max-width: 1200px) {
        font-size: 14px;
    }
    @media (max-width: 900px) {
        font-size: 13px;
    }
    @media (max-width: 600px) {
        font-size: 12px;
    }
`
