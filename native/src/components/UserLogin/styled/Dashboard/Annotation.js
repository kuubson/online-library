import styled from 'styled-components'

import Text from 'components/common/Text'

import utils from 'utils'

export default styled(Text)`
    text-align: center;
    font-size: ${utils.scale(15)}px;
    margin-bottom: ${({ noMargin }) => (noMargin ? 0 : utils.scale(25))}px;
`
