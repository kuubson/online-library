import * as Styled from './styled'
import { FixedContainer } from 'components/shared/styled'

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
