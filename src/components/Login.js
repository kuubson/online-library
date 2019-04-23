import React from 'react'

const Login = () => {
    return (
        <div className="login fullsize flex">
            <form className="login-form form">
                <div className="login-form-input-container form-input-container">
                    <label htmlFor="email" className="login-form-input-label form-input-label">Email:</label>
                    <input className="login-form-input form-input" id="email" name="email" type="text" placeholder="Type your email..." />
                </div>
                <div className="login-form-input-container form-input-container">
                    <label htmlFor="password" className="login-form-input-label form-input-label">Password:</label>
                    <input className="login-form-input form-input" id="password" name="password" type="password" placeholder="Type your password..." />
                </div>
                <div className="login-form-input-container form-input-container">
                    <input className="login-form-input form-input" type="submit" value="Login" />
                </div>
                <div className="login-form-text-container form-text-container">
                    <a href="/register" className="login-form-text form-text">Feel free to register now!</a>
                </div>
            </form>
        </div>
    )
}

export default Login
