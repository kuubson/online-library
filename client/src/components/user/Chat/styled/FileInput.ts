import styled from 'styled-components'

export const FileInput = styled.input.attrs(() => ({
    id: 'file',
    type: 'file'
}))`
    width: 0px;
    height: 0px;
    opacity: 0;
    position: absolute;
    bottom: 0px;
    z-index: -1;
`
