import React from 'react'
import styled from 'styled-components'

import StoreBook from '../StoreBook/StoreBook'

const StoreFreeBooksContainerWrapper = styled.div`
    padding: 10px;
    padding-bottom: 0px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: 270px;
    grid-gap: 20px;
    flex: 1;
`;

const StoreFreeBooksContainer = () => {
    return (
        <StoreFreeBooksContainerWrapper>
            <StoreBook author="Kyle" title="Wat up" price="5.55" paid />
            <StoreBook author="Kyle" title="Wat up" free />
        </StoreFreeBooksContainerWrapper>
    )
}

export default StoreFreeBooksContainer