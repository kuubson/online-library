import React, { useState, useLayoutEffect } from 'react'
import validator from 'validator'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { withRouter, Link } from 'react-router-dom'
import getCookie from '../../resources/helpers/getCookie'

const Register = props => {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatedPassword, setRepeatedPassword] = useState('')
    const [nameError, setNameError] = useState('')
    const [surnameError, setSurnameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [repeatedPasswordError, setRepeatedPasswordError] = useState('')

    useLayoutEffect(() => {
        if (getCookie('token')) props.history.push('/store')
    }, [])

    const dispatch = useDispatch()
    const setIsLoading = payload => dispatch({ type: 'setIsLoading', payload })
    const setApiResponseSuccessMessage = payload => dispatch({ type: 'setApiResponseSuccessMessage', payload })
    const setApiResponseErrorMessage = payload => dispatch({ type: 'setApiResponseErrorMessage', payload })
    const setApiResponseWarningMessage = payload => dispatch({ type: 'setApiResponseWarningMessage', payload })
    const setApiResponseCallbackFunction = payload => dispatch({ type: 'setApiResponseCallbackFunction', payload })

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
    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            setIsLoading(true)
            axios.post('/register', {
                name,
                surname,
                email,
                password
            }).then(res => {
                setIsLoading(false)
                if (res.data.error) setApiResponseErrorMessage(res.data.errorMessage)
                if (res.data.warning) setApiResponseWarningMessage(res.data.warningMessage)
                if (res.data.success) {
                    setApiResponseCallbackFunction(() => props.history.push('/store'))
                    setApiResponseSuccessMessage(res.data.successMessage)
                }
            }).catch(error => {
                if (error) {
                    setIsLoading(false)
                    setApiResponseErrorMessage('Something went wrong, try again by refreshing page!')
                }
            })
        }
    }
    return (
        <section className="register wrapper">
            <form className="inputs" onSubmit={handleSubmit}>
                <div className="inputs__input-wrapper">
                    <label className="inputs__input-label" htmlFor="name">Name</label>
                    <input id="name" className="inputs__input" name="name" type="text" placeholder="Type your name..." value={name} onChange={e => setName(e.target.value)} />
                    {nameError && <p className="inputs__input-error">{nameError}</p>}
                </div>
                <div className="inputs__input-wrapper">
                    <label className="inputs__input-label" htmlFor="surname">Surname</label>
                    <input id="surname" className="inputs__input" name="surname" type="surname" placeholder="Type your surname..." value={surname} onChange={e => setSurname(e.target.value)} />
                    {surnameError && <p className="inputs__input-error">{surnameError}</p>}
                </div>
                <div className="inputs__input-wrapper">
                    <label className="inputs__input-label" htmlFor="email">E-mail</label>
                    <input id="email" className="inputs__input" name="email" type="email" placeholder="Type your e-mail..." value={email} onChange={e => setEmail(e.target.value)} />
                    {emailError && <p className="inputs__input-error">{emailError}</p>}
                </div>
                <div className="inputs__input-wrapper">
                    <label className="inputs__input-label" htmlFor="password">Password</label>
                    <input id="password" className="inputs__input" name="password" type="password" placeholder="Type your e-mail..." value={password} onChange={e => setPassword(e.target.value)} />
                    {passwordError && <p className="inputs__input-error">{passwordError}</p>}
                </div>
                <div className="inputs__input-wrapper">
                    <label className="inputs__input-label" htmlFor="repeatedPassword">Repeated Password</label>
                    <input id="repeatedPassword" className="inputs__input" name="repeatedPassword" type="repeatedPassword" placeholder="Type your e-mail..." value={repeatedPassword} onChange={e => setRepeatedPassword(e.target.value)} />
                    {repeatedPasswordError && <p className="inputs__input-error">{repeatedPasswordError}</p>}
                </div>
                <button className="inputs__input--submit">Register</button>
                <Link to="/login" className="inputs__annotation">Have already account? Log in now!</Link>
            </form>
        </section>
    )
}

export default withRouter(Register)