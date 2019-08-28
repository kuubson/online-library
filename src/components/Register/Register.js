import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

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
    const [name, setName] = useState()
    const [surname, setSurname] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [repeatedPassword, setRepeatedPassword] = useState()
    const [nameError, setNameError] = useState()
    const [surnameError, setSurnameError] = useState()
    const [emailError, setEmailError] = useState()
    const [passwordError, setPasswordError] = useState()
    const [passwordRepeatedError, setPasswordRepeatedError] = useState()
    const [successResponseMessage, setSuccessResponseMessage] = useState()
    const [errorResponseMessage, setErrorResponseMessage] = useState()
    const handleRegister = () => {
        axios.post('/register', {
            name,
            surname,
            email,
            password
        }).then(res => {
            console.log(res)
        })
    }
    return (
        <RegisterWrapper>
            <RegisterInput placeholder="Type your name..." label="Name" onChange={setName} />
            <RegisterInput placeholder="Type your surname..." label="Surname" onChange={setSurname} />
            <RegisterInput placeholder="Type your e-mail..." label="E-mail" onChange={setEmail} />
            <RegisterInput secure placeholder="Type your password..." label="Password" onChange={setPassword} />
            <RegisterInput secure placeholder="Type your password again..." label="Repeat Password" onChange={setRepeatedPassword} />
            <RegisterSubmit onClick={handleRegister} />
        </RegisterWrapper>
    )
}

export default Register