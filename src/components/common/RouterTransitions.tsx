import React, { useEffect, useState } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

export interface IRoute {
    order: number
    pathname: string
    render: () => React.ReactNode
}

interface IRouterTransitions {
    routes: IRoute[]
    location: string
}

const RouterTransitions: React.FC<IRouterTransitions> = ({ children, routes, location }) => {
    const [exactRoute] = routes.filter(({ pathname }) => pathname === location)
    const [similarRoute] = routes.filter(({ pathname }) => {
        const basicRoute = location
            .split('/')
            .map(v => isNaN(parseInt(v)) && v)
            .filter(v => v)
            .join('/')
        return pathname.includes(basicRoute)
    })
    const [pathname, setPathname] = useState(location)
    const [animationDirection, setAnimationDirection] = useState('')
    const [animationOrder, setAnimationOrder] = useState(
        exactRoute ? exactRoute.order : similarRoute ? similarRoute.order : 30
    )
    useEffect(() => {
        const newAnimationOrder =
            (exactRoute && exactRoute.order) || (similarRoute && similarRoute.order)
        if (pathname !== location) {
            const animationDirection = animationOrder < newAnimationOrder ? 'left' : 'right'
            setPathname(location)
            setAnimationOrder(newAnimationOrder)
            setAnimationDirection(animationDirection)
        }
    })
    return (
        <TransitionGroup className={animationDirection}>
            <CSSTransition key={location} classNames="route__container" timeout={500}>
                <div className="route">{children}</div>
            </CSSTransition>
        </TransitionGroup>
    )
}

export default RouterTransitions
