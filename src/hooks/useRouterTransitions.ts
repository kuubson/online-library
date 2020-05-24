import React, { useEffect, useState } from 'react'

export interface IRoute {
    order: number
    pathname: string
    render: () => React.ReactNode
}

export default (routes: IRoute[], curretPathname: string) => {
    const [exactRoute] = routes.filter(({ pathname }) => pathname === curretPathname)
    const [similarRoute] = routes.filter(({ pathname }) => {
        const basicRoute = curretPathname
            .split('/')
            .map(v => isNaN(parseInt(v)) && v)
            .filter(v => v)
            .join('/')
        return pathname.includes(basicRoute)
    })
    const [pathname, setPathname] = useState(curretPathname)
    const [animationDirection, setAnimationDirection] = useState('')
    const [animationOrder, setAnimationOrder] = useState(
        exactRoute ? exactRoute.order : similarRoute ? similarRoute.order : 30
    )
    useEffect(() => {
        const newAnimationOrder =
            (exactRoute && exactRoute.order) || (similarRoute && similarRoute.order)
        if (pathname !== curretPathname) {
            const animationDirection = animationOrder < newAnimationOrder ? 'left' : 'right'
            setPathname(curretPathname)
            setAnimationOrder(newAnimationOrder)
            setAnimationDirection(animationDirection)
        }
    })
    return {
        animationDirection
    }
}
