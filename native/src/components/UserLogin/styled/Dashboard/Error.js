import styled from 'styled-components'

import Text from 'components/common/Text'

import utils from 'utils'

export default styled(Text)`
    color: red;
    font-size: ${utils.scale(12)}px;
    margin-top: ${utils.scale(10)}px;
`
