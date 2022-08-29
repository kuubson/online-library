import React, { useEffect, useState } from 'react'
import { Animated } from 'react-native'
import styled from 'styled-components'
import { Actions } from 'react-native-router-flux'

import { API_URL } from '@env'

import hooks from 'hooks'

import Dashboard from './styled/Dashboard'

import utils from 'utils'

const MenuContainer = styled.View`
    background: #0088ff;
    border-bottom-color: white;
`

const Menu = ({ scene }) => {
    const { socket, setSocket } = hooks.useSocket()
    const { unreadMessagesAmount } = hooks.useMessages()
    const cartItemsAmount = hooks.useCart().cart.length
    const [shouldMenuExpand, setShouldMenuExpand] = useState(false)
    const [menuAnimation] = useState(new Animated.Value(0))
    const [optionsAnimation] = useState(new Animated.Value(0))
    const [optionAnimation] = useState(new Animated.Value(0))
    const [linesAnimation] = useState(new Animated.Value(0))
    const [line1Opacity] = useState(new Animated.Value(1))
    const [line3Animation] = useState(new Animated.Value(0))
    const [line3Translate] = useState(new Animated.Value(0))
    const linesRotate = linesAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '45deg']
    })
    const line3Rotate = line3Animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg']
    })
    const zeroOneAnimations = {
        animatedState: [optionAnimation, optionAnimation, linesAnimation, line3Animation],
        initialState: [optionAnimation, linesAnimation, line3Animation, line3Translate]
    }
    useEffect(() => {
        if (shouldMenuExpand) {
            zeroOneAnimations.animatedState.map(animation => {
                Animated.timing(animation, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true
                }).start()
            })
            Animated.timing(menuAnimation, {
                toValue: utils.scale(2),
                duration: 800,
                useNativeDriver: false
            }).start()
            Animated.timing(optionsAnimation, {
                toValue: utils.scale(188),
                duration: 800,
                useNativeDriver: false
            }).start()
            Animated.timing(line1Opacity, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true
            }).start()
            Animated.timing(line3Translate, {
                toValue: -utils.scale(7),
                duration: 800,
                useNativeDriver: true
            }).start()
        } else {
            zeroOneAnimations.initialState.map(animation => {
                Animated.timing(animation, {
                    toValue: 0,
                    duration: 800,
                    useNativeDriver: true
                }).start()
            })
            Animated.timing(line1Opacity, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true
            }).start()
            Animated.timing(menuAnimation, {
                toValue: 0,
                duration: 800,
                useNativeDriver: false
            }).start()
            Animated.timing(optionsAnimation, {
                toValue: 0,
                duration: 800,
                useNativeDriver: false
            }).start()
        }
    }, [shouldMenuExpand])
    const logout = async () => {
        const url = `${API_URL}/api/global/logout`
        const response = await utils.apiAxios.get(url)
        if (response) {
            socket.disconnect()
            setSocket(undefined)
            Actions.reset('Guest')
        }
    }
    return (
        <MenuContainer
            as={Animated.View}
            style={{
                borderBottomWidth: menuAnimation
            }}
        >
            <Dashboard.Content>
                <Dashboard.Logo>Online Library</Dashboard.Logo>
                <Dashboard.Lines
                    as={Animated.TouchableOpacity}
                    style={{
                        transform: [
                            {
                                rotate: linesRotate
                            }
                        ]
                    }}
                    onPress={() => setShouldMenuExpand(shouldMenuExpand => !shouldMenuExpand)}
                >
                    <Dashboard.Line
                        as={Animated.View}
                        style={{
                            opacity: line1Opacity
                        }}
                    />
                    <Dashboard.Line />
                    <Dashboard.Line
                        as={Animated.View}
                        style={{
                            transform: [
                                {
                                    rotate: line3Rotate
                                },
                                {
                                    translateX: line3Translate
                                }
                            ]
                        }}
                        noMargin
                    />
                </Dashboard.Lines>
            </Dashboard.Content>
            <Dashboard.Options
                as={Animated.View}
                style={{
                    height: optionsAnimation
                }}
            >
                {['Store', 'Profile', 'Cart', 'Chat', 'Logout'].map(option => {
                    const withLogout = option === 'Logout'
                    return (
                        option !== scene && (
                            <Dashboard.OptionContainer
                                key={option}
                                onPress={() =>
                                    withLogout ? logout() : Actions.push(`User${option}`)
                                }
                            >
                                <Dashboard.Option
                                    as={Animated.Text}
                                    style={{
                                        opacity: optionAnimation
                                    }}
                                    noMargin={withLogout}
                                >
                                    {option}
                                </Dashboard.Option>
                                {option === 'Cart' && cartItemsAmount > 0 && (
                                    <Dashboard.CounterContainer>
                                        <Dashboard.Counter>
                                            {cartItemsAmount <= 99 ? cartItemsAmount : 99}
                                        </Dashboard.Counter>
                                    </Dashboard.CounterContainer>
                                )}
                                {option === 'Chat' && unreadMessagesAmount > 0 && (
                                    <Dashboard.CounterContainer>
                                        <Dashboard.Counter>
                                            {unreadMessagesAmount <= 99 ? unreadMessagesAmount : 99}
                                        </Dashboard.Counter>
                                    </Dashboard.CounterContainer>
                                )}
                            </Dashboard.OptionContainer>
                        )
                    )
                })}
            </Dashboard.Options>
        </MenuContainer>
    )
}

export default Menu
