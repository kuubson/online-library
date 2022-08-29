import styled from 'styled-components'

import Text from 'components/common/Text'

import utils from 'utils'

export default styled(Text)`
    margin-bottom: ${({ last }) => (last ? utils.scale(35) : utils.scale(15))}px;
`
