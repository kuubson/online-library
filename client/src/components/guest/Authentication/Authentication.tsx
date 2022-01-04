import { useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

import { HomeContainer } from 'components/guest/Home/Home'

import { setApiFeedback } from 'helpers'

import { axios, history } from 'utils'

const AuthenticationContainer = styled(HomeContainer)``

const Authentication = () => {
    const { token } = useParams()
    useEffect(() => {
        const verifyEmail = async () => {
            try {
                if (!token) {
                    console.log(token)
                    return history.push('/login')
                }
                const url = `/api/user/auth/authenticateEmail`
                const response = await axios.post(url, {
                    token
                })
                if (response) {
                    setApiFeedback(
                        'Email address authentication',
                        'Your email address has been successfully authenticated, you can login now',
                        'Okey',
                        () => history.push('/login')
                    )
                }
            } catch (error) {
                console.log(error)
                history.push('/login')
            }
        }
        verifyEmail()
    }, [token])
    return <AuthenticationContainer />
}

export default Authentication
