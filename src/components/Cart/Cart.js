import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Navbar from '../Navbar/Navbar'
import PayPalButton from '../PayPal/PayPalButton'

const Cart = () => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.global.cart)
    const setCart = payload => dispatch({ type: 'setCart', payload })
    const cartBooks = useSelector(state => state.global.cart)
    const removeBook = id => {
        let currentCart = [...cartBooks]
        let updatedCart = currentCart.filter(book => {
            return book.id !== id
        })
        setCart(updatedCart)
    }
    let price = 0
    return (
        <div className="cart wrapper">
            <Navbar cart />
            {cart.length === 0 ? <h2 className="cart__warning">Your cart is empty!</h2> :
                <section className="books">
                    <article className="books__column books__column--left">
                        <header className="books__header books__header--nomargintop">
                            <h2 className="books__header-text">Chosen books are here, ready to buy!</h2>
                        </header>
                        <div className="books__container">
                            {cart && cart.map(book => {
                                price += +book.price
                                return (
                                    <figure className="books__book" key={book.id}>
                                        <img className="book__image" src={book.cover} alt={'Book' + book.title + ' written by ' + book.author} />
                                        <div className="book__details">
                                            <h3 className="book__author">{book.author}</h3>
                                            <h3 className="book__title">{book.title}</h3>
                                        </div>
                                        <p className="book__price">${book.price}</p>
                                        <button className="book__button" onClick={() => removeBook(book.id)}>Cancel</button>
                                    </figure>
                                )
                            })}
                        </div>
                    </article>
                    <article className="books__column books__column--right">
                        <header className="books__header books__header--nomarginbottom">
                            <h2 className="books__header-text">Summary</h2>
                        </header>
                        <div className="cart__summary">
                            {cart && cart.map(book => {
                                return (
                                    <div className="cart__summary-item" key={book.id}>
                                        <h3 className="cart__summary-title">Book "{book.title}"</h3>
                                        <p className="cart__summary-price">1 x ${book.price}</p>
                                    </div>
                                )
                            })}
                            {price > 0 &&
                                <>
                                    <div className="cart__summary-total">Total ${price.toFixed(2)}</div>
                                    <PayPalButton price={+price.toFixed(2)} />
                                </>
                            }
                        </div>
                    </article>
                </section>
            }
        </div>
    )
}

export default Cart