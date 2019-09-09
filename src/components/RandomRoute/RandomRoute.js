import React, { useLayoutEffect } from 'react'
import { withRouter } from 'react-router-dom'
import getCookie from '../../resources/helpers/getCookie'

const RandomRoute = props => {
    useLayoutEffect(() => {
        if (getCookie('token')) {
            props.history.push('/store')
        } else {
            props.history.push('/login')
        }
    }, [])
    return null
}

export default withRouter(RandomRoute)