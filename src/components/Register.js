import React, { useState, useEffect } from 'react'
import validator from 'validator'
import passwordValidator from 'password-validator'
import axios from 'axios'

const Register = ({ history }) => {
    let _isMounted = false;
    useEffect(() => {
        _isMounted = true;
        const jwt = sessionStorage.getItem('jwt');
        if (jwt) {
            history.push('/account');
        }
        return () => {
            _isMounted = false;
        }
    })
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [nameError, setNameError] = useState("");
    const [surnameError, setSurnameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [password2Error, setPassword2Error] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const validate = () => {
        const passwordSchema = new passwordValidator().is().min(8).max(20).has().uppercase().has().lowercase().has().digits().has().not().spaces();
        validator.isEmpty(name) ? setNameError("You cannot leave this field empty!") : validator.isLength(name, { min: 2 }) ? setNameError("") : setNameError("Your name is for sure too short!");
        validator.isEmpty(surname) ? setSurnameError("You cannot leave this field empty!") : validator.isLength(surname, { min: 2 }) ? setSurnameError("") : setSurnameError("Your surname is for sure too short!");
        validator.isEmpty(email) ? setEmailError("You have to give your email!") : validator.isEmail(email) ? setEmailError("") : setEmailError("This is not a proper email!");
        validator.isEmpty(password) ? setPasswordError("You have to have your password!") : passwordSchema.validate(password) ? setPasswordError("") : setPasswordError("Your password must: be at least 8 chars long, have: digits, no spaces, small, capital letters")
        validator.equals(password, password2) ? setPassword2Error("") : setPassword2Error("Passwords do not match!");
        if (validator.isLength(name, { min: 2 }) && validator.isLength(surname, { min: 2 }) && validator.isEmail(email) && passwordSchema.validate(password) && validator.equals(password, password2)) {
            return true;
        } else {
            return false;
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (_isMounted) {
            if (validate()) {
                const register = await axios.post('/register', {
                    name,
                    surname,
                    email,
                    password
                })
                const response = register.data;
                if (response.done) {
                    setSuccessMessage(response.msg);
                    setErrorMessage("");
                    setTimeout(() => {
                        history.push('/login')
                    }, 1000);
                } else {
                    setErrorMessage(response.msg)
                }
            }
        }
    }
    return (
        <div className="register fullsize flex">
            <form className="register-form form" onSubmit={handleSubmit}>
                <div className="register-form-input-container form-input-container">
                    <label htmlFor="name" className="register-form-input-label form-input-label">Name:</label>
                    <input className="register-form-input form-input" id="name" name="name" type="text" placeholder="Type your name..." onChange={e => setName(e.target.value)} />
                </div>
                {nameError && <div className="error">{nameError}</div>}
                <div className="register-form-input-container form-input-container">
                    <label htmlFor="surname" className="register-form-input-label form-input-label">Surname:</label>
                    <input className="register-form-input form-input" id="surname" name="surname" type="text" placeholder="Type your surname..." onChange={e => setSurname(e.target.value)} />
                </div>
                {surnameError && <div className="error">{surnameError}</div>}
                <div className="register-form-input-container form-input-container">
                    <label htmlFor="email" className="register-form-input-label form-input-label">Email:</label>
                    <input className="register-form-input form-input" id="email" name="email" type="text" placeholder="Type your email..." onChange={e => setEmail(e.target.value)} />
                </div>
                {emailError && <div className="error">{emailError}</div>}
                <div className="register-form-input-container form-input-container">
                    <label htmlFor="password" className="register-form-input-label form-input-label">Password:</label>
                    <input className="register-form-input form-input" id="password" name="password" type="password" placeholder="Type your password..." onChange={e => setPassword(e.target.value)} />
                </div>
                {passwordError && <div className="error">{passwordError}</div>}
                <div className="register-form-input-container form-input-container">
                    <label htmlFor="password2" className="register-form-input-label form-input-label">Password again:</label>
                    <input className="register-form-input form-input" id="password2" name="password2" type="password" placeholder="Type again your password..." onChange={e => setPassword2(e.target.value)} />
                </div>
                {password2Error && <div className="error">{password2Error}</div>}
                <div className="register-form-input-container form-input-container">
                    <input className="register-form-input form-input" type="submit" value="Register" />
                </div>
                {successMessage && <div className="success">{successMessage}</div>}
                {errorMessage && <div className="error">{errorMessage}</div>}
                <div className="register-form-text-container form-text-container">
                    <a href="/login" className="register-form-text form-text">Have already account? Log in now!</a>
                </div>
            </form>
        </div>
    )
}

export default Register
