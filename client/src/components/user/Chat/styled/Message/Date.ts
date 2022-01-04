import styled, { css } from 'styled-components'

type Date = {
    withCurrentUser?: boolean
    withLastUserMessage?: boolean
    shouldDetailsAppear?: boolean
}

export default styled.div<Date>`
    width: 100%;
    font-size: 13px;
    text-align: left;
    font-weight: bold;
    white-space: nowrap;
    ${({ withCurrentUser }) =>
        withCurrentUser
            ? css`
                  text-align: right;
              `
            : null}
    ${({ withLastUserMessage, shouldDetailsAppear }) =>
        !withLastUserMessage && shouldDetailsAppear
            ? css`
                  margin-bottom: 10px;
              `
            : null}
`
