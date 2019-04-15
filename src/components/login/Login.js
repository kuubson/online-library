import React, { Component } from 'react'

import { loginAnimations } from '../../animations/LoginAnimations'

export class Login extends Component {
    componentDidMount() {
        loginAnimations();
    }
    render() {
        return (
            <div className="login">
                <form className="login-form">
                    <div className="input email">
                        <label htmlFor="email">Email:</label>
                        <input className="login-input" id="email" name="email" type="text" placeholder="Type your email..." />
                    </div>
                    <div className="input password">
                        <label htmlFor="password">Password:</label>
                        <input className="login-input" name="password" type="password" placeholder="Type your password..." />
                    </div>
                    <div className="input submit">
                        <input className="login-input" type="submit" value="Login" />
                    </div>
                </form>
            </div>
        )
    }
}

export default Login
