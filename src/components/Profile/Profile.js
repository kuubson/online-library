import React, { useState, useLayoutEffect } from 'react'
import getCookie from '../../resources/helpers/getCookie'
import { withRouter } from 'react-router-dom'

import Navbar from '../Navbar/Navbar'

const Profile = props => {
    useLayoutEffect(() => {
        if (!getCookie('token')) props.history.push('/login')
    }, [])
    return (
        <section className="profile wrapper">
            <Navbar profile />
            <section className="books">
                <article className="books__column books__column--left">
                    <header className="books__header">
                        <h2 className="books__header-text">Bought premium books are there here!</h2>
                    </header>
                    <div className="books__container">
                        <figure className="books__book">
                            <img className="book__image" src="https://picsum.photos/200/300" alt="random photo" />
                            <div className="book__details">
                                <h3 className="book__author">Alan Goodis</h3>
                                <h3 className="book__title">Way Up</h3>
                            </div>
                            <button className="book__button">Open</button>
                        </figure>
                    </div>
                </article>
                <article className="books__column books__column--right">
                    <header className="books__header">
                        <h2 className="books__header-text">Enjoy reading your free books!</h2>
                    </header>
                    <div className="books__container">
                        <figure className="books__book">
                            <img className="book__image" src="https://picsum.photos/200/300" alt="random photo" />
                            <div className="book__details">
                                <h3 className="book__author">Alan Goodis</h3>
                                <h3 className="book__title">Way Up</h3>
                            </div>
                            <button className="book__button">Open</button>
                        </figure>
                    </div>
                </article>
            </section>
        </section>
    )
}

export default withRouter(Profile)