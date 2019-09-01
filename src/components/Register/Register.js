import React, { useState, useLayoutEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import validator from 'validator'
import getCookie from '../../resources/helpers/getCookie'
import { useDispatch } from 'react-redux'

import MainBackground from '../../assets/img/MainBackground.jpg'
import RegisterInput from './RegisterInput'
import RegisterSubmit from './RegisterSubmit'
import Loader from '../../sharedComponents/Loader/Loader'
import ApiResponseHandler from '../../sharedComponents/Errors/ApiResponseHandler'
import ValidationError from '../../sharedComponents/Errors/ValidationError'
import BackHome from '../../sharedComponents/BackHome/BackHome'

const RegisterWrapper = styled.div`
    width: 100%;
    height: 100vh;
    background: linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${MainBackground}) center center no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position:relative;
`;

const Register = ({ history }) => {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatedPassword, setRepeatedPassword] = useState('')
    const [nameError, setNameError] = useState()
    const [surnameError, setSurnameError] = useState()
    const [emailError, setEmailError] = useState()
    const [passwordError, setPasswordError] = useState()
    const [repeatedPasswordError, setRepeatedPasswordError] = useState()
    const [responseMessageError, setResponseMessageError] = useState()
    const [responseMessageWarning, setResponseMessageWarning] = useState()
    const [responseMessageSuccess, setResponseMessageSuccess] = useState()
    const setIsLoading = payload => dispatch({ type: 'setIsLoading', payload })
    useLayoutEffect(() => {
        if (getCookie('token')) history.push('/store')
    }, [])
    const validate = () => {
        validator.isEmpty(name) ? setNameError('Your name field is empty!') : setNameError('')
        validator.isEmpty(surname) ? setSurnameError('Your surname field is empty!') : setSurnameError('')
        validator.isEmpty(email) ? setEmailError('Your e-mail field is empty!') : !validator.isEmail(email) ? setEmailError('This is not a proper e-mail!') : setEmailError('')
        validator.isEmpty(password) ? setPasswordError('Your have to type your password!') : setPasswordError('')
        validator.isEmpty(repeatedPassword) ? setRepeatedPasswordError('You have to type password twice!') : !validator.equals(password, repeatedPassword) ? setRepeatedPasswordError('Passwords are not equal!') : setRepeatedPasswordError('')
        if (!validator.isEmpty(name) && !validator.isEmpty(surname) && !validator.isEmpty(email) && validator.isEmail(email) && !validator.isEmpty(password) && !validator.isEmpty(repeatedPassword) && validator.equals(password, repeatedPassword)) {
            return true
        } else {
            return false
        }
    }
    const handleRegister = () => {
        if (validate()) {
            setIsLoading(true)
            axios.post('/register', {
                name,
                surname,
                email,
                password
            }).then(res => {
                setIsLoading(false)
                if (res.data.error) {
                    setResponseMessageError(res.data.errorMessage)
                }
                if (res.data.warning) {
                    setResponseMessageWarning(res.data.warningMessage)
                }
                if (res.data.success) {
                    setResponseMessageSuccess(res.data.successMessage)
                }
            })
        }
    }
    const hideApiResponseHandler = () => {
        setResponseMessageError()
        setResponseMessageWarning()
        setResponseMessageSuccess()
        if (responseMessageSuccess) {
            history.push('/login')
        }
    }
    return (
        <RegisterWrapper>
            <RegisterInput placeholder='Type your name...' label='Name' onChange={setName} />
            <ValidationError error={nameError} />
            <RegisterInput placeholder='Type your surname...' label='Surname' onChange={setSurname} />
            <ValidationError error={surnameError} />
            <RegisterInput placeholder='Type your e-mail...' label='E-mail' onChange={setEmail} />
            <ValidationError error={emailError} />
            <RegisterInput secure placeholder='Type your password...' label='Password' onChange={setPassword} />
            <ValidationError error={passwordError} />
            <RegisterInput secure placeholder='Type your password again...' label='Repeat Password' onChange={setRepeatedPassword} />
            <ValidationError error={repeatedPasswordError} />
            <RegisterSubmit onClick={handleRegister} />
            <BackHome />
            {responseMessageError && <ApiResponseHandler error responseMessage={responseMessageError} onClick={hideApiResponseHandler} />}
            {responseMessageWarning && <ApiResponseHandler warning responseMessage={responseMessageWarning} onClick={hideApiResponseHandler} />}
            {responseMessageSuccess && <ApiResponseHandler success responseMessage={responseMessageSuccess} onClick={hideApiResponseHandler} />}
        </RegisterWrapper>
    )
}

export default Register