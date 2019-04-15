import React, { Component } from 'react'

import { loginAnimations } from '../../animations/LoginAnimations'
import validator from 'validator'

export class Login extends Component {
    state = {
        email: "",
        password: "",
        emailError: "",
        passwordError: "",
    }

    componentDidMount() {
        loginAnimations();
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {

        e.preventDefault();
        const { email, password } = this.state;
        validator.isEmpty(email) ? this.setState({ emailError: "You cannot login without email!" }) : this.setState({ emailError: "" });
        validator.isEmpty(password) ? this.setState({ passwordError: "You cannot login without password!" }) : this.setState({ passwordError: "" });
        if (!validator.isEmpty(email) && !validator.isEmpty(password)) {
            console.log("Validated");
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
                </form>
            </div>
        )
    }
}

export default Login
