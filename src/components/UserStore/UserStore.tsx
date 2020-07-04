import React, { useState } from 'react'
import styled from 'styled-components/macro'

import hooks from 'hooks'

import { HomeContainer } from 'components/Home/Home'

interface IProps {
    shouldExpandMenu?: boolean
}

interface Book {
    title: string
    author: string
    price?: number
}

const UserStoreContainer = styled(HomeContainer)`
    height: initial;
    min-height: ${() => hooks.useHeight()};
    padding: ${({ shouldExpandMenu }: IProps) =>
        shouldExpandMenu ? '344px 0px 20px 0px' : '130px 0px 20px 0px'};
    transition: padding 0.5s ease-in-out;
    @media (min-width: 800px) {
        padding: 120px 0px 20px 0px;
    }
`

const UserStore: React.FC<IProps> = ({ shouldExpandMenu }) => {
    const [data, setData] = useState<{
        freeBooks: Book[]
        premiumBooks: Book[]
    }>({
        freeBooks: [],
        premiumBooks: []
    })
    const { freeBooks, premiumBooks } = data
    return <UserStoreContainer shouldExpandMenu={shouldExpandMenu}></UserStoreContainer>
}

export default UserStore
