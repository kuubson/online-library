import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'

import hooks from 'hooks'

import { GuestContainer, ICheckToken } from 'components/Roles/Guest'

import USComposed from 'components/UserStore/composed'

import utils from 'utils'

const UserContainer = styled(GuestContainer)``

const User: React.FC = ({ children }) => {
    const [shouldExpandMenu, _setShouldExpandMenu] = useState(false)
    useEffect(() => {
        const checkToken = async () => {
            const url = '/api/global/checkToken'
            const response = await utils.apiAxios.get(url)
            if (response) {
                const { role }: ICheckToken = response.data
                if (role !== 'user') {
                    utils.redirectTo('/user/login')
                }
            }
        }
        checkToken()
    }, [])
    return (
        <>
            <USComposed.Menu
                options={[
                    {
                        option: 'Store',
                        pathname: '/user/store'
                    },
                    {
                        option: 'Profile',
                        pathname: '/user/profile'
                    },
                    {
                        option: 'Cart',
                        pathname: '/user/cart'
                    },
                    {
                        option: 'Upload book',
                        pathname: '/user/upload-book'
                    },
                    {
                        option: 'Logout'
                    }
                ]}
                _setShouldExpandMenu={_setShouldExpandMenu}
            />
            <UserContainer blurred={hooks.useBlur()}>
                {React.cloneElement(children as React.ReactElement, {
                    shouldExpandMenu
                })}
            </UserContainer>
        </>
    )
}

export default User
