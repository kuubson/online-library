const initialState = {
    data: {
        id: '',
        title: '',
        author: '',
        cover: '',
        price: '',
        withProfile: false
    }
}

export default (state = initialState, { payload, type }) => {
    switch (type) {
        case 'setBookPopupData':
            return {
                ...state,
                data: payload
            }
        default:
            return state
    }
}
