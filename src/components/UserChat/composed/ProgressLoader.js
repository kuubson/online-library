import React, { useEffect, useRef } from 'react'
import styled from 'styled-components/macro'

import StyledProgressLoader from '../styled/ProgressLoader'

const ProgressLoaderContainer = styled.div`
    margin-right: 10px;
    display: flex;
    flex-direction: column;
`

const ProgressLoader = ({ percentage }) => {
    const circle = useRef()
    const width = 50
    const strokeWidth = 2
    const radius = width / 2 - strokeWidth * 2
    useEffect(() => {
        if (circle) {
            const radius = circle.current.r.baseVal.value
            const circumference = radius * 2 * Math.PI
            circle.current.style.strokeDasharray = `${circumference} ${circumference}`
            const offset = circumference - (percentage / 100) * circumference
            circle.current.style.strokeDashoffset = offset
        }
    }, [percentage])
    return (
        <ProgressLoaderContainer>
            <StyledProgressLoader.RingsContainer>
                <StyledProgressLoader.Rings>
                    <StyledProgressLoader.Ring
                        ref={circle}
                        r={radius}
                        cx="75"
                        cy="75"
                        strokeDashoffset={radius * 2 * Math.PI}
                    />
                    <StyledProgressLoader.Ring strokeOpacity="0.3" r={radius} cx="75" cy="75" />
                </StyledProgressLoader.Rings>
                <StyledProgressLoader.Percentage>
                    {percentage.toFixed(0)}%
                </StyledProgressLoader.Percentage>
            </StyledProgressLoader.RingsContainer>
        </ProgressLoaderContainer>
    )
}

export default ProgressLoader
