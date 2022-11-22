import { FixedContainer } from 'styles/styled'

import * as Styled from './styled'

export const Loader = () => (
   <FixedContainer>
      <Styled.Circle>
         <Styled.Dot />
         <Styled.Dot />
         <Styled.Dot />
         <Styled.Dot />
         <Styled.Dot />
         <Styled.Dot />
      </Styled.Circle>
   </FixedContainer>
)
