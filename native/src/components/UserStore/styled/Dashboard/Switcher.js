import styled from 'styled-components'

import Text from 'components/common/Text'

import utils from 'utils'

export default styled(Text)`
    font-size: ${utils.scale(12)}px;
    padding: ${utils.scale(8)}px ${utils.scale(20)}px;
    background: white;
    color: black;
`
