import React from 'react'
import Spinner from 'react-spinkit'

const Loader = ({ absolute }) => {
    const className = absolute ? 'loader fadeIn absoluteLoader' : 'loader fadeIn'
    return (
        <div className={className}>
            <Spinner className="loader__spinner" name="ball-spin-fade-loader" fadeIn="none" color="white" />
        </div>
    )
}

export default Loader