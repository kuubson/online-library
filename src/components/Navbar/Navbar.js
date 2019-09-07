import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import removeCookie from '../../resources/helpers/removeCookie'
import { useDispatch } from 'react-redux'

const Navbar = ({ history, store, profile, cart }) => {
    const dispatch = useDispatch()
    const setShouldBookUploaderAppear = payload => dispatch({ type: 'setShouldBookUploaderAppear', payload })
    const logout = () => {
        removeCookie('token')
        history.push('/login')
    }
    const showBookUploader = () => setShouldBookUploaderAppear(true)
    return (
        <nav className="navbar">
            <header className="navbar__brand">Online Library</header>
            <ul className="navbar__links">
                {!store && <li className="navbar__link-wrapper">
                    <Link to="/store" className="navbar__link" >Store</Link>
                </li>}
                {!profile && <li className="navbar__link-wrapper">
                    <Link to="/profile" className="navbar__link" >Profile</Link>
                </li>}
                {!cart && <li className="navbar__link-wrapper">
                    <Link to="/cart" className="navbar__link" >Cart</Link>
                </li>}
                <li className="navbar__link-wrapper">
                    <button className="navbar__button" onClick={showBookUploader}>Upload own book</button>
                </li>
                <li className="navbar__link-wrapper">
                    <button className="navbar__button" onClick={logout}>Logout</button>
                </li>
            </ul>
        </nav>
    )
}

export default withRouter(Navbar)