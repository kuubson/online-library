import React from 'react'
import styled from 'styled-components/macro'

import Dashboard from '../styled/Dashboard'

import { IBook } from '../UserStore'

const BookContainer = styled.div`
    position: relative;
`

const Book: React.FC<IBook> = ({ id, author, title, cover, price }) => {
    return (
        <BookContainer>
            <Dashboard.Cover
                src={cover}
                onError={e =>
                    (e.currentTarget.src = `https://picsum.photos/1920/108${Math.floor(
                        Math.random() * 10
                    )}`)
                }
            />
            <Dashboard.Annotation>{author}</Dashboard.Annotation>
            <Dashboard.Annotation withTitle>{title}</Dashboard.Annotation>
            <Dashboard.Button price={price}>{price ? 'Buy' : 'Borrow'}</Dashboard.Button>
        </BookContainer>
    )
}

export default Book
