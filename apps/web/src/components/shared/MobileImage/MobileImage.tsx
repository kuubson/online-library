import { useState } from 'react'
import styled from 'styled-components/macro'

import { history } from '@online-library/core'

import { queries } from 'styles'

import { MobileLanding } from 'assets/images'

import * as Styled from './styled'

import { useMobile } from './hooks'

type MobileImageProps = {
   onlyBadges?: boolean
}

export const MobileImage = ({ onlyBadges }: MobileImageProps) => {
   const { apk } = useMobile()

   const [showBadges, setShowBadges] = useState(false)

   return (
      <MobileImageContainer onlyBadges={onlyBadges}>
         <Styled.Image
            src={MobileLanding}
            onClick={() => history.push('/mobile-app')}
            onLoad={() => setShowBadges(true)}
         />
         {showBadges && (
            <Styled.Badges>
               <Styled.Badge
                  src="https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white"
                  onClick={() => (window.location.href = apk)}
                  hoverable
               />
               <Styled.Badge src="https://img.shields.io/badge/coming soon-000000?style=for-the-badge&logo=ios&logoColor=white" />
            </Styled.Badges>
         )}
      </MobileImageContainer>
   )
}

type MobileImageContainerProps = Pick<MobileImageProps, 'onlyBadges'>

const MobileImageContainer = styled.div<MobileImageContainerProps>`
   padding: 0px 50px;
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   flex: 1;
   @media ${queries.minLargeTablet} {
      display: ${({ onlyBadges }) => (onlyBadges ? 'none' : 'flex')};
   }
   @media ${queries.largeTablet} {
      flex: unset;
      display: ${({ onlyBadges }) => (onlyBadges ? 'flex' : 'none')};
   }
`
