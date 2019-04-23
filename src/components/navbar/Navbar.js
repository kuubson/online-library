import React from 'react'

const Navbar = ({ children }) => {
    return (
        <div className="navbar">
            <div className="navbar-logo-items-container navbar-items-container">
                <ul className="navbar-logo-items navbar-items">
                    <li className="navbar-logo-item">Online Library</li>
                </ul>
            </div>
            <div className="navbar-links-items-container navbar-items-container">
                <ul className="navbar-links-items navbar-items">
                    {children}
                </ul>
            </div>
        </div>
    )
}

export default Navbar
