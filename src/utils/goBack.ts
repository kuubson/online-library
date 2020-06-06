import utils from 'utils'

export default () => {
    const defaultLocation = '/'
    const previousLocation = window.location.href
    utils.history.goBack()
    setTimeout(
        () => window.location.href === previousLocation && (window.location.href = defaultLocation),
        500
    )
}
