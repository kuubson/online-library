import React from 'react'
import styled from 'styled-components'

const StoreModalBookImageWrapper = styled.div`
    flex: 1;
    align-self: stretch;
    padding: 15px;
`;
const StoreModalBookImageContent = styled.img`
    width: 100%;
    height: 100%;
    @media (max-width: 900px) {
        height: 300px;
    }
    @media (max-width: 450px) {
        height: 230px;
    }
`;

const StoreModalBookImage = ({ src }) => {
    return (
        <StoreModalBookImageWrapper >
            <StoreModalBookImageContent src={src} />
        </StoreModalBookImageWrapper>
    )
}

export default StoreModalBookImage