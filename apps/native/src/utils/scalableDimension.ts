import { Dimensions } from 'react-native'

const window = Dimensions.get('window')

export const scalableDimension =
   window.width >= window.height ? window.width / 2.2 : window.height / 2.2
