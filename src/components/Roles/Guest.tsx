import React, { useEffect } from 'react'
import styled, { css } from 'styled-components'

import hooks from 'hooks'

import utils from 'utils'

export interface ICheckToken {
    role: 'guest' | 'user'
}

export const GuestContainer = styled.section`
    height: ${() => hooks.useHeight()};
    ${({ blurred }: { blurred: boolean }) =>
        blurred &&
        css`
            filter: blur(3px);
        `}
`

const Guest: React.FC = ({ children }) => {
    useEffect(() => {
        const checkToken = async () => {
            const url = '/api/global/checkToken'
            const response = await utils.apiAxios.get(url)
            if (response) {
                const { role }: ICheckToken = response.data
                if (role === 'user') {
                    utils.redirectTo('/user/store')
                }
            }
        }
        checkToken()
    }, [])
    return <GuestContainer blurred={hooks.useBlur()}>{children}</GuestContainer>
}

export default Guest
