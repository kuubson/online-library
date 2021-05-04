import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components/macro'

import { compose } from 'redux'
import hoc from 'hoc'

import hooks from 'hooks'

import Dashboard from '../styled/Dashboard'

import utils from 'utils'

const MenuContainer = styled.nav`
    width: calc(100% - 40px);
    height: 90px;
    padding: 0px 30px;
    background: #0088ff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: width 0.3s ease-in-out, right 0.3s ease-in-out, left 0.3s ease-in-out;
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
    @media (max-width: 800px) {
        height: 80px;
        padding: 0px 25px 0px 20px;
    }
    ${({ shouldStickMenu }) =>
        shouldStickMenu &&
        css`
            width: 100%;
            position: fixed;
            top: 0px;
            right: 0px;
            left: 0px;
            z-index: 3;
        `};
`

const Menu = ({ location, options, _setShouldMenuExpand }) => {
    const [shouldMenuExpand, setShouldMenuExpand] = useState(false)
    useEffect(() => _setShouldMenuExpand(shouldMenuExpand), [shouldMenuExpand])
    const { cart, removeFromCart } = hooks.useCart()
    const logout = async () => {
        const url = '/api/global/logout'
        const response = await utils.apiAxios.get(url)
        if (response) {
            window.FB.getLoginStatus(response => {
                if (response.status === 'connected') {
                    window.FB.logout(() => null)
                }
            })
            cart.map(id => removeFromCart(id))
            utils.redirectTo('/user/login')
        }
    }
    const offset = hooks.useTopOffset()
    const shouldStickMenu = parseInt(offset) > 20
    return (
        <MenuContainer shouldStickMenu={shouldStickMenu}>
            <Dashboard.Logo>Online Library</Dashboard.Logo>
            <Dashboard.LinesContainer
                onClick={() => setShouldMenuExpand(shouldMenuExpand => !shouldMenuExpand)}
                shouldMenuExpand={shouldMenuExpand}
            >
                <Dashboard.Line shouldMenuExpand={shouldMenuExpand} />
                <Dashboard.Line shouldMenuExpand={shouldMenuExpand} />
                <Dashboard.Line shouldMenuExpand={shouldMenuExpand} />
            </Dashboard.LinesContainer>
            <Dashboard.OptionsContainer shouldMenuExpand={shouldMenuExpand}>
                {options.map(
                    ({ option, pathname, cartItemsAmount }) =>
                        location.pathname !== pathname && (
                            <Dashboard.Option
                                key={option}
                                onClick={() =>
                                    option === 'Logout' ? logout() : utils.redirectTo(`${pathname}`)
                                }
                                shouldMenuExpand={shouldMenuExpand}
                                cartItemsAmount={cartItemsAmount}
                            >
                                {option}
                            </Dashboard.Option>
                        )
                )}
            </Dashboard.OptionsContainer>
        </MenuContainer>
    )
}

export default compose(hoc.withRouter)(Menu)
