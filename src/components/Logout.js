import { useEffect } from 'react'
import { connect } from 'react-redux'

import { setTitle, setAuthor, setPrice, setCover, setFreeBooks, setPaidBooks, setBorrowedBooks, setBoughtBooks } from '../actions/book';
import { setEmail } from '../actions/user'
import { setCart } from '../actions/cart'

const Logout = (props) => {
    useEffect(() => {
        sessionStorage.clear();
        localStorage.clear();
        props.setEmail("");
        props.setCart([]);
        props.setBoughtBooks("");
        props.setBorrowedBooks("");
        props.setPaidBooks("");
        props.setFreeBooks("");
        props.setTitle("");
        props.setAuthor("");
        props.setPrice("");
        props.setCover("");
        props.history.push('/')
    }, [])
    return null;
}

const mapDispatchToProps = (dispatch) => {
    return {
        setEmail: payload => dispatch(setEmail(payload)),
        setCart: payload => dispatch(setCart(payload)),
        setBoughtBooks: payload => dispatch(setBoughtBooks(payload)),
        setBorrowedBooks: payload => dispatch(setBorrowedBooks(payload)),
        setPaidBooks: payload => dispatch(setPaidBooks(payload)),
        setFreeBooks: payload => dispatch(setFreeBooks(payload)),
        setTitle: payload => dispatch(setTitle(payload)),
        setAuthor: payload => dispatch(setAuthor(payload)),
        setPrice: payload => dispatch(setPrice(payload)),
        setCover: payload => dispatch(setCover(payload))
    }
}

export default connect(null, mapDispatchToProps)(Logout)
