import styled from 'styled-components'

import { queries } from 'styles'

import { MobileLanding } from 'assets/images'

import * as Styled from './styled'

import type { UseMobileAppHook } from '../../hooks'

type MobileImageProps = {
   apk: UseMobileAppHook['apk']
   downloadApk: UseMobileAppHook['downloadApk']
   onlyBadges?: boolean
}

export const MobileImage = ({ apk, downloadApk, onlyBadges }: MobileImageProps) => (
   <MobileImageContainer onlyBadges={onlyBadges}>
      <Styled.Image src={MobileLanding} />
      <Styled.Badges>
         <Styled.Badge
            src="https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white"
            onClick={downloadApk}
            $active={!!apk}
            $hoverable
         />
         <Styled.Badge src="https://img.shields.io/badge/coming soon-000000?style=for-the-badge&logo=ios&logoColor=white" />
      </Styled.Badges>
   </MobileImageContainer>
)

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
