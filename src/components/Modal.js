import React from 'react'
import { connect } from 'react-redux'
import { setTitle, setAuthor, setPrice, setCover } from '../actions/book'
import { setCart } from '../actions/cart'
import $ from 'jquery'
import axios from 'axios'
import uuid from 'uuid'

const Modal = (props) => {
    const closeModal = () => {
        $('.modal').css('display', 'none');
        props.setTitle("");
        props.setAuthor("");
        props.setPrice("");
        props.setCover("");
    }
    const borrowBook = () => {
        const book = {
            title: props.title,
            author: props.author,
            cover: props.cover,
        }
        axios.post('/borrowBook', {
            email: props.email,
            book
        }, { headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` } }).then(result => {
            const done = result.data.done;
            const message = result.data.msg;
            if (done) {
                closeModal();
                props.setSuccessMessage(message);
                props.setErrorMessage("");
                setTimeout(() => {
                    props.setSuccessMessage("");
                }, 3000);
            } else {
                closeModal();
                props.setErrorMessage(message);
                props.setSuccessMessage("");
                setTimeout(() => {
                    props.setErrorMessage("");
                }, 3000);
            }
        })
    }
    const buyBook = () => {
        const book = {
            id: uuid(),
            title: props.title,
            author: props.author,
            price: props.price,
            cover: props.cover,
        }
        const currentCart = props.cart;
        currentCart.unshift(book);
        props.setCart(currentCart);
        closeModal();
        props.setSuccessMessage("Book has been added to cart");
        setTimeout(() => {
            props.setSuccessMessage("");
        }, 3000);
    }
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="image">
                    <img className="book-img" src={`data:image/jpeg;base64,${props.cover}`} alt="book" />
                </div>
                <div className="details">
                    <div className="text">That's just a small step from getting this book:</div>
                    <div className="book-author">{`Book written by ${props.author}`}</div>
                    <div className="book-title">{`Named ${props.title}`}</div>
                    {props.price && <div className="book-price">{`That costs ${props.price}$`}</div>}
                </div>
                <div className="choice">
                    <div className="text">I am sure I want this book</div>
                    <div className="buttons">
                        {props.price && <button className="button button-yes" onClick={buyBook}>Yes, add to cart</button>}
                        {!props.price && <button className="button button-yes" onClick={borrowBook}>Yes</button>}
                        <button className="button button-no" onClick={closeModal}>No</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        email: state.user.email,
        title: state.book.title,
        author: state.book.author,
        price: state.book.price,
        cover: state.book.cover,
        cart: state.cart.cart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCart: payload => dispatch(setCart(payload)),
        setTitle: payload => dispatch(setTitle(payload)),
        setAuthor: payload => dispatch(setAuthor(payload)),
        setPrice: payload => dispatch(setPrice(payload)),
        setCover: payload => dispatch(setCover(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
