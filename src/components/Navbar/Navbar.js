import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import removeCookie from '../../resources/helpers/removeCookie'
import { useDispatch } from 'react-redux'

const Navbar = ({ history, store, profile, cart }) => {
    const [shouldExpand, setShouldExpand] = useState()
    const className = shouldExpand ? 'navbar__links--mobile expand' : 'navbar__links--mobile shrink'
    const dispatch = useDispatch()
    const setShouldBookUploaderAppear = payload => dispatch({ type: 'setShouldBookUploaderAppear', payload })
    const showBookUploader = () => setShouldBookUploaderAppear(true)
    const logout = () => {
        removeCookie('token')
        history.push('/login')
    }
    const handleClick = () => setShouldExpand(shouldExpand => !shouldExpand)
    return (
        <>
            <nav className="navbar">
                <header className="navbar__brand">Online Library</header>
                <button className="navbar__menu-icon" onClick={handleClick}><i className="icon-menu"></i></button>
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
            <ul className={className}>
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
        </>
    )
}

export default withRouter(Navbar)