import React, { useState, useLayoutEffect } from 'react'
import validator from 'validator'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { withRouter, Link } from 'react-router-dom'
import getCookie from '../../resources/helpers/getCookie'


const Login = props => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    useLayoutEffect(() => {
        if (getCookie('token')) props.history.push('/store')
    }, [])

    const [cookies, setCookie] = useCookies();
    const dispatch = useDispatch()
    const setUserEmail = payload => dispatch({ type: 'setUserEmail', payload })
    const setIsLoading = payload => dispatch({ type: 'setIsLoading', payload })
    const setApiResponseSuccessMessage = payload => dispatch({ type: 'setApiResponseSuccessMessage', payload })
    const setApiResponseErrorMessage = payload => dispatch({ type: 'setApiResponseErrorMessage', payload })
    const setApiResponseWarningMessage = payload => dispatch({ type: 'setApiResponseWarningMessage', payload })
    const setApiResponseCallbackFunction = payload => dispatch({ type: 'setApiResponseCallbackFunction', payload })

    const validate = () => {
        validator.isEmpty(email) ? setEmailError('Your e-mail field is empty!') : !validator.isEmail(email) ? setEmailError('This is not a proper e-mail!') : setEmailError('')
        validator.isEmpty(password) ? setPasswordError('Your have to type your password!') : setPasswordError('')
        if (!validator.isEmpty(email) && validator.isEmail(email) && !validator.isEmpty(password)) {
            return true
        } else {
            return false
        }
    }
    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            setIsLoading(true)
            axios.post('/login', {
                email,
                password
            }).then(res => {
                setIsLoading(false)
                if (res.data.error) setApiResponseErrorMessage(res.data.errorMessage)
                if (res.data.warning) setApiResponseWarningMessage(res.data.warningMessage)
                if (res.data.success) {
                    setApiResponseCallbackFunction(() => props.history.push('/store'))
                    setApiResponseSuccessMessage(res.data.successMessage)
                    setCookie('token', res.data.token, {
                        httpOnly: false,
                        secure: false,
                        expires: new Date(new Date().getTime() + (7 * 24 * 60 * 60 * 1000))
                    })
                    setUserEmail(email)
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
        <section className="login wrapper">
            <form className="inputs" onSubmit={handleSubmit} noValidate>
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
                <button className="inputs__input--submit">Login</button>
                <Link to="/register" className="inputs__annotation">Feel free to register now!</Link>
            </form>
        </section>
    )
}

export default withRouter(Login)