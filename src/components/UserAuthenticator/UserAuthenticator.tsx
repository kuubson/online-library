import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import { useParams } from 'react-router-dom'

import { HomeContainer } from 'components/Home/Home'

import utils from 'utils'

const UserAuthenticatorContainer = styled(HomeContainer)``

const UserAuthenticator = () => {
    const { token } = useParams()
    useEffect(() => {
        const verifyEmail = async () => {
            if (!token) {
                utils.redirectTo('/login')
            } else {
                const url = `/api/user/authenticateEmail`
                try {
                    const response = await utils.apiAxios.post(url, {
                        token
                    })
                    if (response) {
                        utils.setFeedbackData(
                            'Account registration',
                            'Your e-mail address has been successfully authenticated, you can login now',
                            'Log in',
                            () => utils.redirectTo('/login')
                        )
                    }
                } catch (error) {
                    utils.redirectTo('/login')
                }
            }
        }
        verifyEmail()
    }, [])
    return <UserAuthenticatorContainer />
}

export default UserAuthenticator
