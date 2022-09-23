import { debounce } from 'lodash'

import { setLoading } from 'helpers'

export const debounceLoader = debounce(() => setLoading(true), 800)

export const resetLoader = () => {
   setLoading(false)
   debounceLoader.cancel()
}
