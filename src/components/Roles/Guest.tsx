import React from 'react'
import styled, { css } from 'styled-components'

import hooks from '~hooks'

export const GuestContainer = styled.section`
    height: ${() => hooks.useHeight()};
    ${({ blurred }: { blurred: boolean }) =>
        blurred &&
        css`
            filter: blur(3px);
        `}
`

const Guest: React.FC = ({ children }) => {
    return <GuestContainer blurred={hooks.useBlur()}>{children}</GuestContainer>
}

export default Guest
