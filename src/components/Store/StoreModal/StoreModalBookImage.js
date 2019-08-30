import React from 'react'
import styled from 'styled-components'

const StoreModalBookImageWrapper = styled.div`
    flex: 1;
    align-self: stretch;
    padding: 20px;
`;
const StoreModalBookImageContent = styled.img`
    width: 100%;
    height: 100%;
`;

const StoreModalBookImage = ({ src }) => {
    return (
        <StoreModalBookImageWrapper >
            <StoreModalBookImageContent src={src} />
        </StoreModalBookImageWrapper>
    )
}

export default StoreModalBookImage