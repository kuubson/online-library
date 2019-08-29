import React from 'react'
import styled from 'styled-components'

const StoreFreeBooksHeaderInputWrapper = styled.div`
    display:flex;
    flex: 1;
`;
const StoreFreeBooksHeaderInputContent = styled.input`
    flex: 0.8;
    font-size: 0.9rem;
    background: none;
    border: none;
    border-bottom: 2.5px solid white;
    color: white;
    padding: 9px 0px;
    text-indent: 5px;
    ::placeholder{
        color: white;
    }
`;
const StoreFreeBooksHeaderInputButton = styled.div`
    background: white;
    padding: 0px 25px;
    display: flex;
    justify-content:center;
    align-items: center;
`;

const StoreFreeBooksHeaderInput = () => {
    return (
        <StoreFreeBooksHeaderInputWrapper>
            <StoreFreeBooksHeaderInputContent type="text" placeholder="Type title of a book..." />
            <StoreFreeBooksHeaderInputButton>Find</StoreFreeBooksHeaderInputButton>
        </StoreFreeBooksHeaderInputWrapper>
    )
}

export default StoreFreeBooksHeaderInput 