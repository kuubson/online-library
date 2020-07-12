import React, { useEffect } from 'react'
import styled, { css } from 'styled-components'
import axios from 'axios'

import hooks from 'hooks'

import utils from 'utils'

export interface ICheckToken {
    role: 'user' | 'admin'
}

interface ISCProps {
    blurred: boolean
}

export const GuestContainer = styled.section`
    min-height: ${() => hooks.useHeight()};
    ${({ blurred }: ISCProps) =>
        blurred &&
        css`
            filter: blur(3px);
        `}
`

const Guest: React.FC = ({ children }) => {
    useEffect(() => {
        const checkToken = async () => {
            try {
                const url = '/api/global/checkToken'
                const response = await axios.get(url)
                if (response) {
                    const { role }: ICheckToken = response.data
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
    return <GuestContainer blurred={hooks.useBlur()}>{children}</GuestContainer>
}

export default Guest
