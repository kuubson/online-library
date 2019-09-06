import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import removeCookie from '../../resources/helpers/removeCookie'

const Navbar = props => {
    const logout = () => {
        removeCookie('token')
        props.history.push('/login')
    }
    return (
        <nav className="navbar">
            <header className="navbar__brand">Online Library</header>
            <ul className="navbar__links">
                <li className="navbar__link-wrapper">
                    <Link to="/store" className="navbar__link" >Store</Link>
                </li>
                <li className="navbar__link-wrapper">
                    <Link to="/profile" className="navbar__link" >Profile</Link>
                </li>
                <li className="navbar__link-wrapper">
                    <button className="navbar__button">Upload own book</button>
                </li>
                <li className="navbar__link-wrapper">
                    <button className="navbar__button" onClick={logout}>Logout</button>
                </li>
            </ul>
        </nav>
    )
}

export default withRouter(Navbar)