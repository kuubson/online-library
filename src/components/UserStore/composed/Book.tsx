import React, { useState } from 'react'
import styled from 'styled-components/macro'
import Loader from 'react-spinkit'

import Dashboard from '../styled/Dashboard'

import { IBook } from '../UserStore'

const BookContainer = styled.div`
    position: relative;
`

const Book: React.FC<IBook> = ({ id, author, title, cover, price }) => {
    const [isLoading, setIsLoading] = useState(true)
    return (
        <BookContainer>
            <Dashboard.Loader
                onAnimationEnd={e => (e.currentTarget.style.display = 'none')}
                isLoading={isLoading}
            >
                <Loader name="circle" fadeIn="none" />
            </Dashboard.Loader>
            <Dashboard.Cover
                src={cover}
                onLoad={() => setIsLoading(false)}
                onError={e =>
                    (e.currentTarget.src = `https://picsum.photos/1920/108${Math.floor(
                        Math.random() * 10
                    )}`)
                }
            />
            <Dashboard.AnnotationsContainer>
                <Dashboard.Annotation>{author}</Dashboard.Annotation>
                <Dashboard.Annotation withTitle>{title}</Dashboard.Annotation>
            </Dashboard.AnnotationsContainer>
            <Dashboard.Button price={price}>{price ? 'Buy' : 'Borrow'}</Dashboard.Button>
        </BookContainer>
    )
}

export default Book
