import styled from 'styled-components'

import { queries } from 'styles'

import { MobileLanding } from 'assets/images'

import * as Styled from './styled'

import { useMobileApp } from '../../hooks'

export const MobileImage = () => {
   const { apk } = useMobileApp()
   return (
      <MobileImageContainer>
         <Styled.Image src={MobileLanding} />
         <Styled.Badges>
            <Styled.Link href={apk} target="_blank" rel="noreferrer" download>
               <Styled.Badge
                  src="https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white"
                  alt="Android link"
                  $active={!!apk}
                  $hoverable
               />
            </Styled.Link>
            <Styled.Link>
               <Styled.Badge
                  src="https://img.shields.io/badge/coming%20soon-000000?style=for-the-badge&logo=ios&logoColor=white"
                  alt="iOS link"
               />
            </Styled.Link>
         </Styled.Badges>
      </MobileImageContainer>
   )
}

const MobileImageContainer = styled.div`
   padding: 0px 50px;
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   flex: 1;
   @media ${queries.largeTablet} {
      flex: 0.5;
   }
`
