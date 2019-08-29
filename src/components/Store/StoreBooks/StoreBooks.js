import React from 'react'
import styled from 'styled-components'

import StoreFreeBooks from './StoreFreeBooks/StoreFreeBooks'
import StorePaidBooks from './StorePaidBooks/StorePaidBooks'
import StoreBooksHeader from './StoreBooksHeader'
import StoreBooksHeaderTitle from './StoreBooksHeaderTitle'
import StorePaidBooksContainer from './StorePaidBooks/StorePaidBooksContainer'
import StoreFreeBooksHeaderInput from './StoreFreeBooks/StoreFreeBooksHeaderInput'
import StoreFreeBooksContainer from './StoreFreeBooks/StoreFreeBooksContainer'

const StoreBooksWrapper = styled.div`
    margin: 20px;
    margin-top: 0px;
    display: flex;
    flex: 1;
    align-self: stretch;
`;

const StoreBooks = () => {
    return (
        <StoreBooksWrapper>
            <StoreFreeBooks>
                <StoreBooksHeader>
                    <StoreBooksHeaderTitle title="Find here awesome books!" />
                    <StoreFreeBooksHeaderInput />
                </StoreBooksHeader>
                <StoreFreeBooksContainer />
            </StoreFreeBooks>
            <StorePaidBooks>
                <StoreBooksHeader>
                    <StoreBooksHeaderTitle title="Choose premium books!" />
                </StoreBooksHeader>
                <StorePaidBooksContainer />
            </StorePaidBooks>
        </StoreBooksWrapper>
    )
}

export default StoreBooks