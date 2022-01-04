interface IBook {
    id: number
    title: string
    author: string
    cover: string
    price: number
    setBookPopupData?: ReactDispatch<IBook | undefined>
    withCart?: boolean
    withProfile?: boolean
    withPopup?: boolean
    withFlips?: boolean
}
