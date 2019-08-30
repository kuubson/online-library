import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

const StoreModalButtonsWrapper = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const StoreModalButtonsContent = styled.div`
    display: flex;
`;
const StoreModalButton = styled.div`
    margin: 0px 15px;
    background: #333;
    padding: 10px 25px;
    color: white;
    font-size: 0.9rem;
    border-radius: 10px;
    cursor: pointer;
`;
const StoreModalButtonsAnnotation = styled.div`
    text-align: center;
    margin-bottom: 30px;
    font-size: 1.1rem;
`;

const StoreModalButtons = () => {
    const dispatch = useDispatch()
    const hideModal = () => dispatch({ type: 'setShouldStoreModalAppear', payload: false })
    const price = useSelector(state => state.global.storeModalData.price)
    return (
        <StoreModalButtonsWrapper>
            {price ? <StoreModalButtonsAnnotation>Add this book to a cart:</StoreModalButtonsAnnotation>
                : <StoreModalButtonsAnnotation>I am sure I want this book:</StoreModalButtonsAnnotation>}
            <StoreModalButtonsContent>
                <StoreModalButton>Yes</StoreModalButton>
                <StoreModalButton onClick={hideModal}>No</StoreModalButton>
            </StoreModalButtonsContent>
        </StoreModalButtonsWrapper>
    )
}

export default StoreModalButtons