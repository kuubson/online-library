import styled from 'styled-components/macro'

export const Location = () => <LocationContainer>{window.location.pathname}</LocationContainer>

const LocationContainer = styled.div.attrs(() => ({ 'data-testid': 'location' }))`
   opacity: 0;
   position: fixed;
`
