import React from 'react'
import styled from 'styled-components'

const StoreFreeBooksWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0.55;
`;

const StoreFreeBooks = ({ children }) => {
    return (
        <StoreFreeBooksWrapper>
            {children}
        </StoreFreeBooksWrapper>
    )
}

export default StoreFreeBooks