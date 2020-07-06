import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { RouteComponentProps } from 'react-router-dom'

import { compose } from 'redux'
import hoc from 'hoc'

import Dashboard from '../styled/Dashboard'

import utils from 'utils'

interface Option {
    option: string
    pathname?: string
}

interface IProps {
    options: Option[]
    _setShouldExpandMenu: React.Dispatch<React.SetStateAction<boolean>>
}

const MenuContainer = styled.nav`
    width: calc(100% - 40px);
    height: 90px;
    padding: 0px 30px;
    background: #0088ff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 20px;
    left: 20px;
    right: 20px;
    @media (max-width: 800px) {
        height: 80px;
        padding: 0px 25px 0px 20px;
    }
`

const Menu: React.FC<RouteComponentProps & IProps> = ({
    location,
    options,
    _setShouldExpandMenu
}) => {
    const [shouldExpandMenu, setShouldExpandMenu] = useState(false)
    useEffect(() => _setShouldExpandMenu(shouldExpandMenu), [shouldExpandMenu])
    const logout = async () => {
        const url = '/api/global/logout'
        const response = await utils.apiAxios.get(url)
        if (response) {
            utils.redirectTo('/user/login')
            window.FB.logout()
        }
    }
    return (
        <MenuContainer>
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
                    ({ option, pathname }) =>
                        location.pathname !== pathname && (
                            <Dashboard.Option
                                key={option}
                                onClick={() =>
                                    option === 'Logout' ? logout() : utils.redirectTo(`${pathname}`)
                                }
                                shouldExpandMenu={shouldExpandMenu}
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
