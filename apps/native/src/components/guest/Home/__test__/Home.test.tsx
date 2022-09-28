import renderer from 'react-test-renderer'

import { Home } from '../Home'

it('renders correctly', () => {
   renderer.create(<Home />)
})
