import utils from 'utils'

export default pathname => {
    window.scrollTo(0, 0)
    utils.history.push(pathname)
}
