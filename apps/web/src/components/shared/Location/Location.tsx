import { useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'

export const Location = () => {
   const { pathname } = useLocation()
   return <LocationContainer>{pathname}</LocationContainer>
}

const LocationContainer = styled.div.attrs(() => ({ 'data-testid': 'location' }))`
   opacity: 0;
   position: fixed;
`
