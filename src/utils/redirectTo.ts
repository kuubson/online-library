import utils from 'utils'

export default (pathname: string) => {
    window.scrollTo(0, 0)
    utils.history.push(pathname)
}
