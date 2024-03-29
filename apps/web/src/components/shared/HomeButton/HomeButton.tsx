import styled from 'styled-components'

import { t } from '@online-library/core'

import { queries } from 'styles'

type HomeButtonProps = {
   withReturnButton?: boolean
}

export const HomeButton = ({ withReturnButton }: HomeButtonProps) => (
   <HomeButtonContainer onClick={() => (withReturnButton ? window.goBack() : window.navigate('/'))}>
      {withReturnButton ? t('buttons.return') : t('buttons.homePage')}
   </HomeButtonContainer>
)

const HomeButtonContainer = styled.button.attrs({ 'data-cy': 'home-button' })`
   height: 38px;
   font-size: 13px;
   font-weight: bold;
   border: 1.5px solid white;
   padding: 0px 30px;
   position: absolute;
   top: 20px;
   left: 20px;
   @media (max-width: 1250px) {
      font-size: 12px;
   }
   @media ${queries.desktop} {
      font-size: 11px;
      padding: 0px 25px;
   }
   @media ${queries.smallTablet} {
      font-size: 10px;
      padding: 0px 22px;
   }
`
