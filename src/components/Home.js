import React, { useEffect } from 'react'

const Home = ({ history }) => {
    useEffect(() => {
        const jwt = sessionStorage.getItem('jwt');
        if (jwt) {
            history.push('/account');
        }
    })
    const handleClick = (where) => {
        history.push(where)
    }
    return (
        <div className="home darkfullsize">
            <div className="header-title title fullflex">
                Online Library
            </div>
            <div className="header-buttons fullflexcolumn">
                <button className="header-button button" onClick={() => handleClick('/login')}>Login</button>
                <button className="header-button button" onClick={() => handleClick('/register')}>Register</button>
            </div>
            <div className="header-infos fullflexaround">
                <div className="header-info fullflex info">The largest resource of books in the Internet!</div>
                <div className="header-info fullflex info">Top books from top authors for free!</div>
                <div className="header-info fullflex info">The lowest pricing for premium books in the Internet!</div>
            </div>
        </div>
    )
}

export default Home
