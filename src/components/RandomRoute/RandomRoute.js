import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'

const RandomRoute = ({ history }) => {
    useEffect(() => history.push('/login'), [])
    return null
}

export default withRouter(RandomRoute)