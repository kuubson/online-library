import React from 'react'
import styled from 'styled-components'

const BookUploaderTitleWrapper = styled.div`
    font-size: 1.5rem;
    text-align: center;
    @media (max-width: 650px) {
        font-size: 1.2rem;
        margin-top: 30px;
    }
    @media (max-width: 450px) {
        font-size: 1.05rem;
        padding: 0px 30px;t
    }
`;

const BookUploaderTitle = () => {
    return (
        <BookUploaderTitleWrapper>Upload your own book to the store!</BookUploaderTitleWrapper>
    )
}

export default BookUploaderTitle