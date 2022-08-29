import React, { useState } from 'react'
import { Dimensions } from 'react-native'
import styled from 'styled-components'
import Spinner from 'react-native-spinkit'

import hooks from 'hooks'

import Dashboard from '../styled/Dashboard'

import utils from 'utils'

const window = Dimensions.get('window')

const BookContainer = styled.ImageBackground`
    height: ${window.width >= window.height ? window.width / 2.2 : window.height / 2.2}px;
    margin-top: ${({ first }) => (first ? 0 : utils.scale(25))}px;
`

const Book = ({ id, title, author, cover, price, withCart, withProfile, withPopup, first }) => {
    const [uri, setUri] = useState(cover)
    const [isLoading, setIsLoading] = useState(true)
    const { setBookPopupData } = hooks.useBookPopup()
    const { cart, removeFromCart } = hooks.useCart()
    const isInCart = cart.includes(id)
    return (
        <BookContainer
            source={{
                uri
            }}
            onLoad={() => setIsLoading(false)}
            onError={() => {
                setIsLoading(true)
                setUri(`https://picsum.photos/1920/108${Math.floor(Math.random() * 10)}`)
            }}
            first={first}
        >
            {isLoading && (
                <Dashboard.Loader>
                    <Spinner color="white" type="Circle" size={utils.scale(25)} />
                </Dashboard.Loader>
            )}
            <Dashboard.Annotations>
                <Dashboard.Annotation>{author}</Dashboard.Annotation>
                <Dashboard.Annotation withTitle>{title}</Dashboard.Annotation>
            </Dashboard.Annotations>
            {withCart ? (
                <Dashboard.ButtonContainer>
                    <Dashboard.Button onPress={() => removeFromCart(id)}>
                        <Dashboard.ButtonText>Remove (${price})</Dashboard.ButtonText>
                    </Dashboard.Button>
                </Dashboard.ButtonContainer>
            ) : withProfile ? (
                <Dashboard.ButtonContainer>
                    <Dashboard.Button
                        onPress={() =>
                            setBookPopupData({
                                id,
                                title,
                                author,
                                cover,
                                price,
                                withProfile: true
                            })
                        }
                    >
                        <Dashboard.ButtonText>Open</Dashboard.ButtonText>
                    </Dashboard.Button>
                </Dashboard.ButtonContainer>
            ) : !withPopup ? (
                <Dashboard.ButtonContainer>
                    {price && <Dashboard.ButtonText>${price}</Dashboard.ButtonText>}
                    <Dashboard.Button
                        onPress={() =>
                            !isInCart &&
                            setBookPopupData({
                                id,
                                title,
                                author,
                                cover,
                                price
                            })
                        }
                    >
                        <Dashboard.ButtonText>
                            {price ? (isInCart ? 'In cart' : 'Buy') : 'Borrow'}
                        </Dashboard.ButtonText>
                    </Dashboard.Button>
                </Dashboard.ButtonContainer>
            ) : (
                withPopup &&
                price && (
                    <Dashboard.ButtonContainer>
                        <Dashboard.Button>
                            <Dashboard.ButtonText>Price: ${price}</Dashboard.ButtonText>
                        </Dashboard.Button>
                    </Dashboard.ButtonContainer>
                )
            )}
        </BookContainer>
    )
}

export default Book
