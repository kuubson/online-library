import { useEffect, useState } from 'react'

export default () => {
    const [offest, setOffest] = useState(`${window.pageYOffset}px`)
    const handleOffest = () => setOffest(`${window.pageYOffset}px`)
    useEffect(() => {
        setTimeout(() => handleOffest, 0)
        window.addEventListener('scroll', handleOffest)
        return () => window.removeEventListener('scroll', handleOffest)
    }, [])
    return offest
}
