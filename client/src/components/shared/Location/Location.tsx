import { useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'

export const Location = () => {
   const location = useLocation()
   return <LocationContainer>{location.pathname}</LocationContainer>
}

const LocationContainer = styled.div.attrs(() => ({ 'data-testid': 'location' }))`
   opacity: 0;
   position: fixed;
`
