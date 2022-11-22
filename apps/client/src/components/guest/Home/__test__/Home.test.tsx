import 'jest-styled-components'
import { render } from 'utils/testUtils'

import { t } from '@online-library/core'

import { Home } from '../Home'

it('should render proper buttons', () => {
   const home = render(<Home />)

   const [loginButton, registrationButton] = home.getAllByRole('button')

   expect(loginButton).toHaveTextContent(t('buttons.login'))

   expect(registrationButton).toHaveTextContent(t('buttons.register'))
})

it('can navigate to login form', async () => {
   // TODO: handle with cypress
})
