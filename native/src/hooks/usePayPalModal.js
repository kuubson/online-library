import { useDispatch, useSelector } from 'react-redux'

export default () => {
    const dispatch = useDispatch()
    const { shouldPayPalModalAppear } = useSelector(state => state.payPalModal)
    const setShouldPayPalModalAppear = payload =>
        dispatch({ type: 'setShouldPayPalModalAppear', payload })
    return {
        shouldPayPalModalAppear,
        setShouldPayPalModalAppear
    }
}
