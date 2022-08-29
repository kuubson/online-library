import styled from 'styled-components'

import Text from 'components/common/Text'

import utils from 'utils'

export default styled(Text)`
    text-align: center;
    color: ${({ black }) => (black ? 'black' : 'white')};
    font-size: ${utils.scale(17)}px;
    margin-top: ${utils.scale(25)}px;
    margin-bottom: ${utils.scale(25)}px;
`
