import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import axios from 'axios'

import hooks from 'hooks'

import { GuestContainer } from 'components/common/Roles/Guest'

import USComposed from 'components/UserStore/composed'

import utils from 'utils'

const UserContainer = styled(GuestContainer)``

const User = ({ children }) => {
    const [shouldMenuExpand, _setShouldMenuExpand] = useState(false)
    useEffect(() => {
        const checkToken = async () => {
            try {
                const url = '/api/global/checkToken'
                const response = await axios.get(url)
                if (response) {
                    const { role } = response.data
                    if (role !== 'user') {
                        utils.redirectTo('/user/login')
                    }
                }
            } catch (error) {
                utils.handleApiError(error)
            }
        }
        checkToken()
    }, [])
    const cartItemsAmount = hooks.useCart().cart.length
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
                        pathname: '/user/cart',
                        cartItemsAmount: cartItemsAmount <= 99 ? cartItemsAmount : 99
                    },
                    {
                        option: 'Logout'
                    }
                ]}
                _setShouldMenuExpand={_setShouldMenuExpand}
            />
            <UserContainer>
                {React.cloneElement(children, {
                    shouldMenuExpand
                })}
            </UserContainer>
        </>
    )
}

export default User
