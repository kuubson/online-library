import { useEffect, useState } from 'react'

import utils from 'utils'

export default () => {
    const [initialHeight, setInitialHeight] = useState(window.innerHeight)
    const [isKeyboardOpened, setIsKeyboardOpened] = useState(false)
    useEffect(() => {
        const handleInitialHeight = () => setInitialHeight(window.innerHeight)
        window.addEventListener('resize', handleInitialHeight)
        window.addEventListener('scroll', handleInitialHeight)
        return () => {
            window.removeEventListener('resize', handleInitialHeight)
            window.removeEventListener('scroll', handleInitialHeight)
        }
    }, [])
    useEffect(() => {
        const handlePopupHeight = () =>
            setIsKeyboardOpened(utils.isMobile() && initialHeight > window.innerHeight)
        window.addEventListener('resize', handlePopupHeight)
        return () => window.removeEventListener('resize', handlePopupHeight)
    }, [initialHeight])
    return isKeyboardOpened
}
