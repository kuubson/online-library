import React, { useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'

import { useSocket } from 'hooks'

import { handleApiError } from 'helpers'

import { history } from 'utils'

export const GuestContainer = styled.section`
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
        url('https://picsum.photos/1920/1080') center center no-repeat;
    background-size: cover;
    backface-visibility: hidden;
`

export const Guest: React.FC = ({ children }) => {
    const { closeSocketConnection } = useSocket()
    useEffect(() => {
        closeSocketConnection()
        const checkToken = async () => {
            try {
                const url = '/api/global/auth/checkToken'
                const response = await axios.get(url)
                if (response) {
                    const { role } = response.data
                    if (role === 'user') {
                        history.push('/store')
                    }
                }
            } catch (error) {
                handleApiError(error)
            }
        }
        checkToken()
    }, [])
    return <GuestContainer>{children}</GuestContainer>
}
