import React, { Component } from 'react'

import { registerAnimations } from '../../animations/RegisterAnimations'
import validator from 'validator'
import passwordValidator from 'password-validator'
import axios from 'axios'

export class Register extends Component {
    _isMounted = false;
    state = {
        name: "",
        surname: "",
        email: "",
        password: "",
        password2: "",
        nameError: "",
        surnameError: "",
        emailError: "",
        passwordError: "",
        password2Error: "",
        successMessage: "",
        errorMessage: ""
    }
    componentDidMount() {
        sessionStorage.getItem('jwt') && this.props.history.push('/account');
        this._isMounted = true;
        registerAnimations();
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = async (e) => {

        e.preventDefault();
        this.setState({
            successMessage: "",
            errorMessage: ""
        })
        const { name, surname, email, password, password2 } = this.state;
        const passwordSchema = new passwordValidator();
        passwordSchema.is().min(8).max(20).has().uppercase().has().lowercase().has().digits().has().not().spaces();
        validator.isEmpty(name) ? this.setState({ nameError: "You cannot leave this field empty!" }) : validator.isLength(name, { min: 2 }) ? this.setState({ nameError: "" }) : this.setState({ nameError: "Your name is for sure too short!" });
        validator.isEmpty(surname) ? this.setState({ surnameError: "You cannot leave this field empty!" }) : validator.isLength(surname, { min: 2 }) ? this.setState({ surnameError: "" }) : this.setState({ surnameError: "Your surname is for sure too short!" });
        validator.isEmpty(email) ? this.setState({ emailError: "You have to give your email!" }) : validator.isEmail(email) ? this.setState({ emailError: "" }) : this.setState({ emailError: "This is not a proper email!" });
        validator.isEmpty(password) ? this.setState({ passwordError: "You have to have your password!" }) : passwordSchema.validate(password) ? this.setState({ passwordError: "" }) : this.setState({ passwordError: "Your password must: be at least 8 chars long, have: digits, no spaces, small, capital letters" })
        validator.equals(password, password2) ? this.setState({ password2Error: "" }) : this.setState({ password2Error: "Passwords do not match!" });
        if (validator.isLength(name, { min: 2 }) && validator.isLength(surname, { min: 2 }) && validator.isEmail(email) && passwordSchema.validate(password) && validator.equals(password, password2)) {
            if (this._isMounted) {
                const registerProcess = await axios.post('/register', {
                    name,
                    surname,
                    email,
                    password
                })
                registerProcess.data.done ? this.setState({ successMessage: registerProcess.data.msg }) || setTimeout(() => {
                    this.props.history.push('/login')
                }, 1000) : this.setState({ errorMessage: registerProcess.data.msg })
            }
        }

    }
    render() {
        return (
            <div className="register">
                <form className="register-form" onSubmit={this.handleSubmit}>
                    <div className="input name">
                        <label htmlFor="name">Name:</label>
                        <input className="register-input" id="name" name="name" type="text" placeholder="Type your name..." onChange={this.handleChange} />
                    </div>
                    {this.state.nameError && <div className="error">{this.state.nameError}</div>}
                    <div className="input surname">
                        <label htmlFor="surname">Surname:</label>
                        <input className="register-input" name="surname" type="text" placeholder="Type your surname..." onChange={this.handleChange} />
                    </div>
                    {this.state.surnameError && <div className="error">{this.state.surnameError}</div>}
                    <div className="input email">
                        <label htmlFor="email">Email:</label>
                        <input className="register-input" name="email" type="text" placeholder="Type your email..." onChange={this.handleChange} />
                    </div>
                    {this.state.emailError && <div className="error">{this.state.emailError}</div>}
                    <div className="input password">
                        <label htmlFor="password">Password:</label>
                        <input className="register-input" name="password" type="text" placeholder="Type your password..." onChange={this.handleChange} />
                    </div>
                    {this.state.passwordError && <div className="error">{this.state.passwordError}</div>}
                    <div className="input password2">
                        <label htmlFor="password2">Password:</label>
                        <input className="register-input" name="password2" type="text" placeholder="Type again your password..." onChange={this.handleChange} />
                    </div>
                    {this.state.password2Error && <div className="error">{this.state.password2Error}</div>}
                    <div className="input submit">
                        <input className="register-input" type="submit" value="Register" />
                    </div>
                    {this.state.successMessage && <div className="success">{this.state.successMessage}</div>}
                    {this.state.errorMessage && <div className="error">{this.state.errorMessage}</div>}
                    <div className="form-link-container">
                        <a href="/login" className="form-link">Have already account? Log in now!</a>
                    </div>
                </form>
            </div>
        )
    }
}

export default Register