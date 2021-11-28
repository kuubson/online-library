import React, { useEffect } from 'react'
import styled from 'styled-components/macro'

import hooks from 'hooks'

import { HomeContainer } from 'components/Home/Home'

import utils from 'utils'

const UserAuthenticatorContainer = styled(HomeContainer)``

const UserAuthenticator = () => {
    const { token } = hooks.useParams()
    useEffect(() => {
        const verifyEmail = async () => {
            try {
                if (!token) {
                    return utils.redirectTo('/user/login')
                }
                const url = `/api/user/auth/authenticateEmail`
                const response = await utils.apiAxios.post(url, {
                    token
                })
                if (response) {
                    utils.setFeedbackData(
                        'Email address authentication',
                        'Your email address has been successfully authenticated, you can login now',
                        'Okey',
                        () => utils.redirectTo('/user/login')
                    )
                }
            } catch (error) {
                utils.redirectTo('/user/login')
            }
        }
        verifyEmail()
    }, [])
    return <UserAuthenticatorContainer />
}

export default UserAuthenticator
