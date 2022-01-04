import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { useLocation } from 'react-router'

import * as Styled from '../styled'

import { useSocket, useCart, useTopOffset } from 'hooks'

import { axios, history } from 'utils'

type MenuContainerType = {
    shouldStickMenu?: boolean
}

const MenuContainer = styled.nav<MenuContainerType>`
    width: calc(100% - 40px);
    height: 90px;
    padding: 0px 30px;
    background: ${({ theme }) => theme.mainColor};
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
        shouldStickMenu
            ? css`
                  width: 100%;
                  position: fixed;
                  top: 0px;
                  right: 0px;
                  left: 0px;
                  z-index: 3;
              `
            : null};
`

type Option = {
    option: string
    pathname?: string
    counter?: number
}

interface IMenu {
    options: Option[]
    _setShouldMenuExpand: ReactDispatch<boolean>
}

const Menu: React.FC<IMenu> = ({ options, _setShouldMenuExpand }) => {
    const location = useLocation()
    const { closeSocketConnection } = useSocket()
    const [shouldMenuExpand, setShouldMenuExpand] = useState(false)
    useEffect(() => _setShouldMenuExpand(shouldMenuExpand), [shouldMenuExpand])
    const { cart, removeFromCart } = useCart()
    const logout = async () => {
        const url = '/api/global/auth/logout'
        const response = await axios.get(url)
        if (response) {
            window.FB.getLoginStatus((response: any) => {
                if (response.status === 'connected') {
                    window.FB.logout(() => null)
                }
            })
            closeSocketConnection()
            cart.map(id => removeFromCart(id))
            history.push('/login')
        }
    }
    const offset = useTopOffset()
    const shouldStickMenu = parseInt(offset) > 20
    return (
        <MenuContainer shouldStickMenu={shouldStickMenu}>
            <Styled.Logo>Online Library</Styled.Logo>
            <Styled.LinesContainer
                onClick={() => setShouldMenuExpand(shouldMenuExpand => !shouldMenuExpand)}
                shouldMenuExpand={shouldMenuExpand}
            >
                <Styled.Line shouldMenuExpand={shouldMenuExpand} />
                <Styled.Line shouldMenuExpand={shouldMenuExpand} />
                <Styled.Line shouldMenuExpand={shouldMenuExpand} />
            </Styled.LinesContainer>
            <Styled.OptionsContainer shouldMenuExpand={shouldMenuExpand}>
                {options.map(
                    ({ option, pathname, counter }) =>
                        location.pathname !== pathname && (
                            <Styled.Option
                                key={option}
                                onClick={() =>
                                    option === 'Logout' ? logout() : history.push(`${pathname}`)
                                }
                                shouldMenuExpand={shouldMenuExpand}
                                counter={counter}
                            >
                                {option}
                            </Styled.Option>
                        )
                )}
            </Styled.OptionsContainer>
        </MenuContainer>
    )
}

export default Menu
