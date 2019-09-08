import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <section className="home wrapper">
            <header className="home__header">
                <h1 className="home__header-text">Online Library</h1>
                <div className="home__links-wrapper">
                    <Link to="/login" className="home__header-link">Login</Link>
                    <Link to="/register" className="home__header-link">Register</Link>
                </div>
            </header>
            <div className="home__advantages">
                <p className="home__advantage">The largest resource of books in the internet!</p>
                <p className="home__advantage">Top books from top authors for free!</p>
                <p className="home__advantage">The lowest pricing for premium books!</p>
            </div>
        </section>
    )
}

export default Home