import React from 'react'
import $ from 'jquery'
import anime from 'animejs'

const Navbar = ({ children }) => {
    const handleToggleNavbar = () => {
        $('.navbar-links-items-container').toggle();
        const navbarLinks = $('.navbar-links-item');
        let timeGap = 100;
        for (let x = 0; x < navbarLinks.length; x++) {
            anime({
                targets: navbarLinks[x],
                opacity: [0, 1],
                translateX: [window.innerWidth, 0],
                easing: 'easeOutElastic(1, 1.1)',
                delay: timeGap += 100
            });
        }
    }
    return (
        <div className="navbar">
            <div className="hamburger" onClick={handleToggleNavbar}>
                <div className="icon-menu"></div>
            </div>
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