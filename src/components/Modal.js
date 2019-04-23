import React from 'react'
import { connect } from 'react-redux'
import { setTitle, setAuthor, setPrice, setCover } from '../actions/book'
import $ from 'jquery'

const Modal = (props) => {
    const closeModal = () => {
        $('.modal').css('display', 'none');
        props.setTitle("");
        props.setAuthor("");
        props.setPrice("");
        props.setCover("");
    }
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="image">
                    <img className="book-img" src={`data:image/jpeg;base64,${props.cover}`} alt="book" />
                </div>
                <div className="details">
                    <div className="text">That's just a small step from getting this book:</div>
                    <div className="bookTitle">{`Book written by ${props.author}`}</div>
                    <div className="bookTitle">{`Named ${props.title}`}</div>
                    {props.price && <div className="bookTitle">{`That costs ${props.price}$`}</div>}
                </div>
                <div className="choice">
                    <div className="text">I am sure I want this book</div>
                    <div className="buttons">
                        <button className="button button-yes">Yes</button>
                        <button className="button button-no" onClick={closeModal}>No</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        title: state.book.title,
        author: state.book.author,
        price: state.book.price,
        cover: state.book.cover
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTitle: payload => dispatch(setTitle(payload)),
        setAuthor: payload => dispatch(setAuthor(payload)),
        setPrice: payload => dispatch(setPrice(payload)),
        setCover: payload => dispatch(setCover(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
