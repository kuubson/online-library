import React from 'react'
import Spinner from 'react-spinkit'

const Loader = () => {
    return (
        <div className="loader fadeIn">
            <Spinner name="ball-spin-fade-loader" fadeIn="none" color="white" />
        </div>
    )
}

export default Loader