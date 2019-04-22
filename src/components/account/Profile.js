import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { setCheckedOutBooks, setBoughtBooks, setEmail, setFreeBooks, setPaidBooks } from '../../actions/user'
import uuid from 'uuid'

export class Profile extends Component {
    _isMounted = false;
    state = {
        usersBoughtBooks: [],
        usersCheckedOutBooks: []
    }
    async componentDidMount() {
        this._isMounted = true;

        function sortBooks(boughtBooks, checkedOutBooks) {
            const usersBoughtBooks = boughtBooks.map(book => {
                return (
                    <div className="book" style={{ background: `url(data:image/jpeg;base64,${book.cover}) no-repeat center center`, backgroundSize: 'cover' }} key={uuid()}>
                        <h4 className="title">{book.title}</h4>
                        <div className="buy-details">
                            <button className="buy-button">Buy</button>
                        </div>
                    </div>
                )
            })
            const usersCheckedOutBooks = checkedOutBooks.map(book => {
                return (
                    <div className="checked-out-book" style={{ background: `url(data:image/jpeg;base64,${book.cover}) no-repeat center center`, backgroundSize: 'cover' }} key={uuid()}>
                        <h4 className="title">{book.title}</h4>
                        <button className="open-button">Open</button>
                    </div>
                )
            })
            return {
                usersBoughtBooks,
                usersCheckedOutBooks
            }
        }

        if (this._isMounted) {

            const gettingUsersBooks = await axios.post('/getUsersBooks', {
                email: this.props.email
            })
            this.props.setBoughtBooks(gettingUsersBooks.data.boughtBooks);
            this.props.setCheckedOutBooks(gettingUsersBooks.data.checkedOutBooks);
            console.log(gettingUsersBooks.data.boughtBooks);
            console.log(gettingUsersBooks.data.checkedOutBooks);

            if (this._isMounted) {
                this.setState(sortBooks(this.props.boughtBooks, this.props.checkedOutBooks));
            }

        }

    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    handleLogout = () => {
        sessionStorage.clear();
        this.props.setEmail("");
        this.props.setBoughtBooks([]);
        this.props.setCheckedOutBooks([]);
        this.props.setPaidBooks([]);
        this.props.setFreeBooks([]);
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
                <div className="checked-out-books">
                    <div className="checked-out-books-container">
                        <div className="checked-out-book-title">
                            <h1>Enjoy reading our free books!</h1>
                        </div>
                        {this.state.usersCheckedOutBooks}
                    </div>
                </div>
                <div className="bought-books">
                    <div className="bought-books-container">
                        <div className="bought-book-title">
                            <h1>Bought premium books are there here!</h1>
                        </div>
                        {this.state.usersBoughtBooks}
                    </div>
                </div>
                <div className="bought-books-info info1">
                    You have 7 days to read each book since you checked it out!
                </div>
                <div className="bought-books-info info2">
                    Premium books are available forever, we hope you love them!
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        email: state.user.email,
        boughtBooks: state.user.boughtBooks,
        checkedOutBooks: state.user.checkedOutBooks
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCheckedOutBooks: payload => dispatch(setCheckedOutBooks(payload)),
        setBoughtBooks: payload => dispatch(setBoughtBooks(payload)),
        setEmail: payload => dispatch(setEmail(payload)),
        setFreeBooks: payload => dispatch(setFreeBooks(payload)),
        setPaidBooks: payload => dispatch(setPaidBooks(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
