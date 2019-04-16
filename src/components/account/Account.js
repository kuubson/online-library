import React, { Component } from 'react'

export class Account extends Component {
    componentDidMount() {
        !sessionStorage.getItem('jwt') && this.props.history.push('/login');
    }
    render() {
        return (
            <div className="account">
                Account
            </div>
        )
    }
}

export default Account
