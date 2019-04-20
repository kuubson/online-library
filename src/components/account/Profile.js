import React, { Component } from 'react'

export class Profile extends Component {
    handleLogout = () => {
        sessionStorage.clear();
        this.props.history.push('/');
    }
    handleClick = () => {
        this.props.history.push('/account')
    }
    render() {
        return (
            <div className="profile">
                <div className="account-item navbar">
                    <ul className="navbar-logo-items">
                        <li className="navbar-logo-item">Online library</li>
                    </ul>
                    <ul className="navbar-links-items">
                        <li className="navbar-links-item"><div className="navbar-link" onClick={this.handleClick}>Home</div></li>
                        <li className="navbar-links-item"><div className="navbar-link" onClick={this.handleLogout}>Logout</div></li>
                    </ul>
                </div>
                <div className="box box2"></div>
                <div className="box box3"></div>
                <div className="box box4"></div>
                <div className="box box5"></div>
            </div>
        )
    }
}

export default Profile
