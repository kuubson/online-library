import React from 'react'
import styled from 'styled-components'

const StorePaidBooksWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0.45;
`;

const StorePaidBooks = ({ children }) => {
    return (
        <StorePaidBooksWrapper>
            {children}
        </StorePaidBooksWrapper>
    )
}

export default StorePaidBooks