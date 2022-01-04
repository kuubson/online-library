import styled, { css } from 'styled-components'

type PageContent = {
    back?: boolean
}

export default styled.div<PageContent>`
    width: 100%;
    height: 100%;
    background: #333;
    font-size: 15px;
    backface-visibility: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @media (max-width: 1200px) {
        font-size: 14px;
    }
    @media (max-width: 900px) {
        font-size: 13px;
    }
    @media (max-width: 600px) {
        font-size: 12px;
    }
    ${({ back }) =>
        back
            ? css`
                  transform: translate(-50%, -50%) rotateY(180deg);
              `
            : null};
`
