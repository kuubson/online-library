import React, { useEffect } from 'react'
import styled from 'styled-components/macro'

import hooks from 'hooks'

import { GuestContainer } from 'components/Roles/Guest'

import utils from 'utils'

import { ICheckToken } from 'components/Roles/Guest'

const UserContainer = styled(GuestContainer)``

const User: React.FC = ({ children }) => {
    useEffect(() => {
        const checkToken = async () => {
            const url = '/api/global/checkToken'
            const response = await utils.apiAxios.get(url)
            if (response) {
                const { role }: ICheckToken = response.data
                if (role === 'guest') {
                    utils.redirectTo('/user/login')
                }
            }
        }
        checkToken()
    }, [])
    return <UserContainer blurred={hooks.useBlur()}>{children}</UserContainer>
}

export default User
