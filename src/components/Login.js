import React, { useState, useEffect } from 'react'
import validator from 'validator'
import axios from 'axios'
import { connect } from 'react-redux'
import { setEmail } from '../actions/user';

const Login = (props) => {
    let _isMounted = false;
    useEffect(() => {
        _isMounted = true;
        const jwt = sessionStorage.getItem('jwt');
        if (jwt) {
            props.history.push('/account');
        }
        return () => {
            _isMounted = false;
        }
    })
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const validate = () => {
        validator.isEmpty(email) ? setEmailError("You cannot login without email!") : validator.isEmail(email) ? setEmailError("") : setEmailError("This is not a proper email!");
        validator.isEmpty(password) ? setPasswordError("You cannot login without password!") : setPasswordError("");
        if (!validator.isEmpty(email) && validator.isEmail(email) && !validator.isEmpty(password)) {
            return true;
        } else {
            return false;
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (_isMounted) {
            if (validate()) {
                const login = await axios.post('/login', {
                    email,
                    password
                });
                const response = login.data;
                if (response.done) {
                    setSuccessMessage(response.msg);
                    setErrorMessage("");
                    props.setEmail(email);
                    sessionStorage.setItem('jwt', response.token);
                    props.history.push('/account')
                } else {
                    setErrorMessage(response.msg)
                }
            }
        }
    }
    return (
        <div className="login fullsize flex">
            <form className="login-form form" onSubmit={handleSubmit}>
                <div className="login-form-input-container form-input-container">
                    <label htmlFor="email" className="login-form-input-label form-input-label">Email:</label>
                    <input className="login-form-input form-input" id="email" name="email" type="text" placeholder="Type your email..." onChange={e => setEmail(e.target.value)} />
                </div>
                {emailError && <div className="error">{emailError}</div>}
                <div className="login-form-input-container form-input-container">
                    <label htmlFor="password" className="login-form-input-label form-input-label">Password:</label>
                    <input className="login-form-input form-input" id="password" name="password" type="password" placeholder="Type your password..." onChange={e => setPassword(e.target.value)} />
                </div>
                {passwordError && <div className="error">{passwordError}</div>}
                <div className="login-form-input-container form-input-container">
                    <input className="login-form-input form-input" type="submit" value="Login" />
                </div>
                {successMessage && <div className="success">{successMessage}</div>}
                {errorMessage && <div className="error">{errorMessage}</div>}
                <div className="login-form-text-container form-text-container">
                    <a href="/register" className="login-form-text form-text">Feel free to register now!</a>
                </div>
            </form>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setEmail: payload => dispatch(setEmail(payload))
    }
}

export default connect(null, mapDispatchToProps)(Login)
