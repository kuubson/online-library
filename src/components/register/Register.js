import React, { Component } from 'react'

import { registerAnimations } from '../../animations/RegisterAnimations'

export class Register extends Component {
    componentDidMount() {
        registerAnimations();
    }
    render() {
        return (
            <div className="register">
                <form className="register-form">
                    <div className="input name">
                        <label htmlFor="name">Name:</label>
                        <input className="register-input" id="name" name="name" type="text" placeholder="Type your name..." />
                    </div>
                    <div className="input surname">
                        <label htmlFor="surname">Surname:</label>
                        <input className="register-input" name="surname" type="text" placeholder="Type your surname..." />
                    </div>
                    <div className="input email">
                        <label htmlFor="email">Email:</label>
                        <input className="register-input" name="email" type="text" placeholder="Type your email..." />
                    </div>
                    <div className="input password">
                        <label htmlFor="password">Password:</label>
                        <input className="register-input" name="password" type="text" placeholder="Type your password..." />
                    </div>
                    <div className="input submit">
                        <input className="register-input" type="submit" value="Register" />
                    </div>
                </form>
            </div>
        )
    }
}

export default Register
