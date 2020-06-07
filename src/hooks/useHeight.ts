import { useEffect, useState } from 'react'

export default () => {
    const [height, setHeight] = useState(`${window.innerHeight}px`)
    const handleHeight = () => setHeight(`${window.innerHeight}px`)
    useEffect(() => {
        setTimeout(() => handleHeight, 0)
        window.addEventListener('resize', handleHeight)
        return () => window.removeEventListener('resize', handleHeight)
    }, [])
    return height
}
