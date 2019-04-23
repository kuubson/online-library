import React from 'react'
import { withRouter } from 'react-router-dom'

const NavbarLink = ({ name, where, history }) => {
    const redirect = (where) => {
        history.push(where);
    }
    return (
        <div className="navbar-links-item"><a href="" className="navbar-link" onClick={() => redirect(where)}>{name}</a></div>
    )
}

export default withRouter(NavbarLink)
