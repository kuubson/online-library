import 'jest-styled-components'
import { render, screen, userEvent } from 'utils/testUtils'

import { App } from 'components/App'

import { Home } from '../Home'

it('should render proper buttons', () => {
   const home = render(<Home />)

   const [loginButton, registrationButton] = home.getAllByRole('button')

   expect(loginButton).toHaveTextContent('Login')

   expect(registrationButton).toHaveTextContent('Register')
})

it('can navigate to login form', async () => {
   const home = render(<App />)

   const user = userEvent.setup()

   const loginButton = home.getByRole('button', { name: 'Login' })

   await user.click(loginButton)

   expect(screen.getByTestId('location')).toHaveTextContent('login')

   // TODO: once i18 config is there, use text values from it
   const annotation1 = screen.getByText("I don't have an account yet, go to registration page")
   const annotation2 = screen.getByText('I forgot password')

   expect(annotation1).toBeInTheDocument()
   expect(annotation2).toBeInTheDocument()
})
