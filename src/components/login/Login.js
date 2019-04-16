import React, { Component } from 'react'

import { loginAnimations } from '../../animations/LoginAnimations'
import validator from 'validator'
import axios from 'axios'

export class Login extends Component {
    _isMounted = false;
    state = {
        email: "",
        password: "",
        emailError: "",
        passwordError: "",
        successMessage: "",
        errorMessage: ""
    }
    componentDidMount() {
        sessionStorage.getItem('jwt') && this.props.history.push('/account');
        this._isMounted = true;
        loginAnimations();
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
        const { email, password } = this.state;
        validator.isEmpty(email) ? this.setState({ emailError: "You cannot login without email!" }) : validator.isEmail(email) ? this.setState({ emailError: "" }) : this.setState({ emailError: "This is not a proper email!" });
        validator.isEmpty(password) ? this.setState({ passwordError: "You cannot login without password!" }) : this.setState({ passwordError: "" });
        if (!validator.isEmpty(email) && validator.isEmail(email) && !validator.isEmpty(password)) {
            if (this._isMounted) {
                const loginProcess = await axios.post('/login', {
                    email,
                    password
                })
                loginProcess.data.done ? this.setState({ successMessage: loginProcess.data.msg }) || sessionStorage.setItem('jwt', loginProcess.data.token) || setTimeout(() => {
                    this.props.history.push('/account');
                }, 1000) : this.setState({ errorMessage: loginProcess.data.msg })
            }
        }

    }
    render() {
        return (
            <div className="login">
                <form className="login-form" onSubmit={this.handleSubmit}>
                    <div className="input email">
                        <label htmlFor="email">Email:</label>
                        <input className="login-input" id="email" name="email" type="text" placeholder="Type your email..." onChange={this.handleChange} />
                    </div>
                    {this.state.emailError && <div className="error">{this.state.emailError}</div>}
                    <div className="input password">
                        <label htmlFor="password">Password:</label>
                        <input className="login-input" name="password" type="password" placeholder="Type your password..." onChange={this.handleChange} />
                    </div>
                    {this.state.passwordError && <div className="error">{this.state.passwordError}</div>}
                    <div className="input submit">
                        <input className="login-input" type="submit" value="Login" />
                    </div>
                    {this.state.successMessage && <div className="success">{this.state.successMessage}</div>}
                    {this.state.errorMessage && <div className="error">{this.state.errorMessage}</div>}
                    <div className="form-link-container">
                        <a href="/register" className="form-link">Feel free to register now!</a>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login
