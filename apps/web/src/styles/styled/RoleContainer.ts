import styled from 'styled-components/macro'

import { RANDOM_IMAGE } from '@online-library/config'

export const RoleContainer = styled.section`
   min-height: 100%;
   background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
      url(${RANDOM_IMAGE}) center center no-repeat;
   background-size: cover;
   backface-visibility: hidden;
   display: flex;
   justify-content: center;
`
