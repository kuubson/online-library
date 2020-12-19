import { useEffect, useState } from 'react'

export default () => {
    const [width, setWidth] = useState(`${window.innerWidth}px`)
    const handleWidth = () => setWidth(`${window.innerWidth}px`)
    useEffect(() => {
        setTimeout(() => handleWidth, 0)
        window.addEventListener('resize', handleWidth)
        return () => window.removeEventListener('resize', handleWidth)
    }, [])
    return width
}
