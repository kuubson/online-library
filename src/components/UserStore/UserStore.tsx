import React from 'react'
import styled from 'styled-components/macro'

import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

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

interface QueryData {
    books: Book[]
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
    @media (max-width: 800px) {
        padding: ${({ shouldExpandMenu }: IProps) =>
            shouldExpandMenu ? '334px 0px 20px 0px' : '120px 0px 20px 0px'};
    }
`

const query = gql`
    {
        books {
            id
        }
    }
`

const UserStore: React.FC<IProps> = ({ shouldExpandMenu }) => {
    const { data } = useQuery<QueryData>(query)
    return (
        <UserStoreContainer shouldExpandMenu={shouldExpandMenu}>
            The library is empty right now!
        </UserStoreContainer>
    )
}

export default UserStore
