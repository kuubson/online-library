import React, { useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'

import hooks from 'hooks'

import utils from 'utils'

export const GuestContainer = styled.section`
    min-height: ${() => hooks.useHeight()};
    background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
        url('https://picsum.photos/1920/1080') center center no-repeat;
    background-size: cover;
    backface-visibility: hidden;
`

const Guest = ({ children }) => {
    const { socket, setSocket } = hooks.useSocket()
    useEffect(() => {
        if (socket) {
            socket.disconnect()
            setTimeout(() => {
                setSocket(undefined)
            }, 0)
        }
        const checkToken = async () => {
            try {
                const url = '/api/global/checkToken'
                const response = await axios.get(url)
                if (response) {
                    const { role } = response.data
                    if (role === 'user') {
                        utils.redirectTo('/user/store')
                    }
                }
            } catch (error) {
                utils.handleApiError(error)
            }
        }
        checkToken()
    }, [])
    return <GuestContainer>{children}</GuestContainer>
}

export default Guest
