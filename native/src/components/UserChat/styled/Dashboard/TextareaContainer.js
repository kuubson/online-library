import styled from 'styled-components'

import utils from 'utils'

export default styled.View`
    height: ${utils.scale(70)}px;
    background: rgba(0, 136, 255, 0.8);
    padding-right: 10px;
    margin: 0px ${utils.scale(10)}px ${utils.scale(15)}px ${utils.scale(10)}px;
    border-radius: ${utils.scale(10)}px;
    justify-content: space-around;
    flex-direction: row;
`
