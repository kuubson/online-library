import { createGlobalStyle } from 'styled-components'

import { queries } from './queries'

export const GlobalStyle = createGlobalStyle`
    html {
        --textareaHeight: 70px;
        --userContentPadding: 150px;
        @media ${queries.largeTablet} {
            --userContentPadding: 140px;
        }
    }
`
