import { useEffect, useRef } from 'react'

import styled from 'styled-components/macro'

import * as Styled from './styled'

const ProgressLoaderContainer = styled.div`
   margin-right: 10px;
   display: flex;
   flex-direction: column;
`

interface IProgressLoader {
   percentage: number
}

const ProgressLoader = ({ percentage }: IProgressLoader) => {
   const circle = useRef<SVGCircleElement>(null)
   const dimension = 50
   const strokeWidth = 2
   const radius = dimension / 2 - strokeWidth * 2
   useEffect(() => {
      if (circle) {
         const radius = circle.current!.r.baseVal.value
         const circumference = radius * 2 * Math.PI
         circle.current!.style.strokeDasharray = `${circumference} ${circumference}`
         const offset = circumference - (percentage / 100) * circumference
         circle.current!.style.strokeDashoffset = offset.toString()
      }
   }, [percentage])
   return (
      <ProgressLoaderContainer>
         <Styled.RingsContainer dimension={dimension}>
            <Styled.Rings dimension={dimension}>
               <Styled.Ring
                  ref={circle}
                  r={radius}
                  cx={dimension / 2}
                  cy={dimension / 2}
                  strokeDashoffset={radius * 2 * Math.PI}
               />
               <Styled.Ring strokeOpacity="0.3" r={radius} cx={dimension / 2} cy={dimension / 2} />
            </Styled.Rings>
            <Styled.Percentage>{percentage.toFixed(0)}%</Styled.Percentage>
         </Styled.RingsContainer>
      </ProgressLoaderContainer>
   )
}

export default ProgressLoader
