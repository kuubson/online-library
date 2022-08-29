import styled from 'styled-components'

import Text from 'components/common/Text'

import utils from 'utils'

export default styled(Text)`
    font-size: ${({ withTitle }) => (withTitle ? utils.scale(15) : utils.scale(18))}px;
    margin-top: ${({ withTitle }) => (withTitle ? utils.scale(5) : 0)}px;
    text-align: center;
`
