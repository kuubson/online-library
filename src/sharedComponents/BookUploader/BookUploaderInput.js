import React from 'react'
import styled from 'styled-components'

const BookUploaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px 0px;
    @media (max-width: 370px) {
        justify-content: center;
        align-items: center;
    }
`;
const BookUploaderInputLabel = styled.label`
    font-size: 1.05rem;
    margin-bottom: 5px;
    @media (max-width: 450px) {
        font-size: 0.9rem;
    }
    @media (max-width: 370px) {
        align-self: flex-start;
    }
`;
const BookUploaderContent = styled.input`
    width: 250px;
    font-size: 0.9rem;
    background: none;
    border: none;
    border-bottom: 1px solid black;
    padding: 9px 0px;
    text-indent: 5px;
    ::placeholder{
        color: black;
    }
    @media (max-width: 450px) {
        font-size: 0.75rem;
    }
    @media (max-width: 370px) {
        width: 180px;
    }
    @media (max-width: 300px) {
        width: 150px;
    }
`;

const BookUploader = ({ placeholder, label, onChange }) => {
    const handleOnChange = e => onChange(e.target.value)
    return (
        <BookUploaderWrapper>
            <BookUploaderInputLabel>{label}</BookUploaderInputLabel>
            <BookUploaderContent type="text" placeholder={placeholder} onChange={handleOnChange} />
        </BookUploaderWrapper>
    )
}

export default BookUploader