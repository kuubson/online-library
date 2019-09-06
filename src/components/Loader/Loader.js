import React, { useState, useLayoutEffect } from 'react'
import Spinner from 'react-spinkit'

const Loader = () => {
    const [shouldFadeIn, setShouldFadeIn] = useState(false)
    useLayoutEffect(() => setShouldFadeIn(true), [])
    const className = shouldFadeIn ? 'loader fadeIn' : 'loader'
    return (
        <div className={className}>
            <Spinner name="ball-spin-fade-loader" fadeIn="none" color="white" />
        </div>
    )
}

export default Loader