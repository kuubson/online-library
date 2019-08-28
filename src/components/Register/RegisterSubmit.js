import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

const RegisterSubmitWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const RegisterSubmitContent = styled.div`
    width: 200px;
    color: white;
    border: 1.5px solid white;
    padding: 10px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    margin-top: 30px;
    cursor: pointer;
    transition: 0.5s;
    :hover{
        transform: scale(1.08)
    }
`;
const RegisterSubmitAnnotation = styled.div`
    color: white;
    text-align: center;
    margin-top: 20px;
    cursor: pointer;
    transition: 0.5s;
    :hover{
        transform: scale(1.03)
    }
`;

const RegisterSubmit = props => {
    const handleClick = where => props.history.push(where)
    return (
        <RegisterSubmitWrapper>
            <RegisterSubmitContent onClick={props.onClick}>Register</RegisterSubmitContent>
            <RegisterSubmitAnnotation onClick={() => handleClick('/login')}>Have already account? Log in now!</RegisterSubmitAnnotation>
        </RegisterSubmitWrapper>
    )
}

export default withRouter(RegisterSubmit)