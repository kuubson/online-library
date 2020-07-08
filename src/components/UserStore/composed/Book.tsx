import React, { useState } from 'react'
import styled, { css } from 'styled-components/macro'
import Loader from 'react-spinkit'

import Dashboard from '../styled/Dashboard'

import { IBook } from '../UserStore'

interface IProps {
    setBookPopupData?: React.Dispatch<React.SetStateAction<IBook | undefined>>
    fullWidth?: boolean
}

const BookContainer = styled.div`
    height: 100%;
    position: relative;
    ${({ fullWidth }: { fullWidth?: boolean }) =>
        fullWidth &&
        css`
            width: 100%;
            @media (max-width: 1150px) {
                max-height: 50%;
            }
        `}
`

const Book: React.FC<IBook & IProps> = ({
    id,
    author,
    title,
    cover,
    price,
    setBookPopupData,
    fullWidth
}) => {
    const [isLoading, setIsLoading] = useState(true)
    return (
        <BookContainer fullWidth={fullWidth}>
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
            {fullWidth && price ? (
                <Dashboard.Button price={price} withoutHover>
                    Price
                </Dashboard.Button>
            ) : (
                !fullWidth && (
                    <Dashboard.Button
                        onClick={() =>
                            setBookPopupData &&
                            setBookPopupData({
                                id,
                                author,
                                title,
                                cover,
                                price
                            })
                        }
                        price={price}
                    >
                        {price ? 'Buy' : 'Borrow'}
                    </Dashboard.Button>
                )
            )}
        </BookContainer>
    )
}

export default Book
