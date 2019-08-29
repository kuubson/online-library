import React from 'react'
import styled from 'styled-components'

import StoreBook from '../StoreBook/StoreBook'

const StorePaidBooksContainerWrapper = styled.div`
    padding: 10px;
    padding-bottom: 0px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 300px;
    grid-gap: 20px;
    flex: 1;
`;

const StorePaidBooksContainer = () => {
    return (
        <StorePaidBooksContainerWrapper>
            <StoreBook />
            <StoreBook author="Kyle" title="Wat up" price="5.55" paid />
            <StoreBook author="Kyle" title="Wat up" free />
        </StorePaidBooksContainerWrapper>
    )
}

export default StorePaidBooksContainer