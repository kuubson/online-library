import React, { useState } from 'react'
import styled from 'styled-components'

const BookUploaderFileInputWrapper = styled.div`
    text-align: center;
    margin: 30px 0px;
`;
const BookUploaderFileInputContent = styled.input`
    width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
`;
const BookUploaderFileInputLabel = styled.label`
    border: 1px solid black;
    padding: 5px 20px;
    cursor: pointer;
    font-size: 0.8rem;
    transition: 0.3s;
    :hover{
        color: white;
        background: black;
    }
`;

const BookUploaderFileInput = ({ onChange }) => {
    const [fileName, setFileName] = useState()
    const handleOnChange = e => {
        onChange(e.target.files[0])
        setFileName(e.target.files[0].name)
    }
    return (
        <BookUploaderFileInputWrapper>
            <BookUploaderFileInputContent type="file" id="addbook" onChange={handleOnChange} />
            <BookUploaderFileInputLabel htmlFor="addbook">{fileName ? fileName : `Choose an image for book's cover...`}</BookUploaderFileInputLabel>
        </BookUploaderFileInputWrapper>
    )
}

export default BookUploaderFileInput