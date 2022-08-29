import { useDispatch, useSelector } from 'react-redux'

export default () => {
    const dispatch = useDispatch()
    const {
        data: { id, title, author, cover, price, withProfile }
    } = useSelector(state => state.bookPopup)
    const shouldBookPopupAppear = !!id && !!title && !!author && !!cover
    const setBookPopupData = payload =>
        dispatch({
            type: 'setBookPopupData',
            payload
        })
    return {
        id,
        title,
        author,
        cover,
        price,
        withProfile,
        shouldBookPopupAppear,
        setBookPopupData
    }
}
