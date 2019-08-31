import React from 'react'
import styled from 'styled-components'

const BookUploaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px 0px;
`;
const BookUploaderInputLabel = styled.label`
    font-size: 1.05rem;
    margin-bottom: 5px;
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