import React from 'react'
import styled from 'styled-components'

import MainBackground from '../../assets/img/MainBackground.jpg'
import RegisterInput from './RegisterInput'
import RegisterSubmit from './RegisterSubmit'

const RegisterWrapper = styled.div`
    width: 100%;
    height: 100vh;
    background: linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${MainBackground}) center center no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Register = () => {
    return (
        <RegisterWrapper>
            <RegisterInput placeholder="Type your name..." label="Name" />
            <RegisterInput placeholder="Type your surname..." label="Surname" />
            <RegisterInput placeholder="Type your e-mail..." label="E-mail" />
            <RegisterInput secure placeholder="Type your password..." label="Password" />
            <RegisterInput secure placeholder="Type your password again..." label="Repeat Password" />
            <RegisterSubmit />
        </RegisterWrapper>
    )
}

export default Register