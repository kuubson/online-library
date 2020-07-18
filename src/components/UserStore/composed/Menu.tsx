import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components/macro'
import { RouteComponentProps } from 'react-router-dom'
import { useApolloClient } from 'react-apollo'

import { compose } from 'redux'
import hoc from 'hoc'

import hooks from 'hooks'

import Dashboard from '../styled/Dashboard'

import utils from 'utils'

interface Option {
    option: string
    pathname?: string
    cartItemsAmount?: number
}

interface IProps {
    options: Option[]
    _setShouldExpandMenu: React.Dispatch<React.SetStateAction<boolean>>
}

interface ISCProps {
    shouldStickMenu?: boolean
}

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
    ${({ shouldStickMenu }: ISCProps) =>
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

const Menu: React.FC<RouteComponentProps & IProps> = ({
    location,
    options,
    _setShouldExpandMenu
}) => {
    const client = useApolloClient()
    const [shouldExpandMenu, setShouldExpandMenu] = useState(false)
    useEffect(() => _setShouldExpandMenu(shouldExpandMenu), [shouldExpandMenu])
    const { cart, removeFromCart } = hooks.useCart()
    const logout = async () => {
        client && client.clearStore()
        cart.map(id => removeFromCart(id))
        const url = '/api/global/logout'
        const response = await utils.apiAxios.get(url)
        if (response) {
            window.FB.logout()
            utils.redirectTo('/user/login')
        }
    }
    const offset = hooks.useTopOffset()
    const shouldStickMenu = parseInt(offset) > 20
    return (
        <MenuContainer shouldStickMenu={shouldStickMenu}>
            <Dashboard.Logo>Online Library</Dashboard.Logo>
            <Dashboard.LinesContainer
                onClick={() => setShouldExpandMenu(shouldExpandMenu => !shouldExpandMenu)}
                shouldExpandMenu={shouldExpandMenu}
            >
                <Dashboard.Line shouldExpandMenu={shouldExpandMenu} />
                <Dashboard.Line shouldExpandMenu={shouldExpandMenu} />
                <Dashboard.Line shouldExpandMenu={shouldExpandMenu} />
            </Dashboard.LinesContainer>
            <Dashboard.OptionsContainer shouldExpandMenu={shouldExpandMenu}>
                {options.map(
                    ({ option, pathname, cartItemsAmount }) =>
                        location.pathname !== pathname && (
                            <Dashboard.Option
                                key={option}
                                onClick={() =>
                                    option === 'Logout' ? logout() : utils.redirectTo(`${pathname}`)
                                }
                                shouldExpandMenu={shouldExpandMenu}
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
