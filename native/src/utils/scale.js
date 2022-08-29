// https://github.com/nirsky/react-native-scaling-example

import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

const isLandscape = Dimensions.get('window').width >= Dimensions.get('window').height

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350
// const guidelineBaseHeight = 680;

let deviceWidth = isLandscape ? height : width

// const verticalScale = size => (height / guidelineBaseHeight) * size
const scale = size => (deviceWidth / guidelineBaseWidth) * size
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor

export default moderateScale
