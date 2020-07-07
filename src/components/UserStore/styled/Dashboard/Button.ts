import styled, { css } from 'styled-components/macro'

interface ISCProps {
    price?: number
}

export default styled.button`
    font-size: 13px;
    padding: 8px 12px;
    background: #333;
    border-radius: 10px;
    transition: transform 0.3s ease-in-out;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%, 0px);
    :hover {
        transform: translate(-50%, 0px) scale(1.03);
    }
    @media (max-width: 900px) {
        font-size: 12px;
    }
    @media (max-width: 600px) {
        font-size: 11px;
    }
    ${({ price }: ISCProps) =>
        price &&
        css`    
            padding: 8px 18px;
            ::after {
                font-weight:bold;
                content: '$${price.toFixed(2)}';
                position: absolute;
                top: -25px;
                left: 50%;
                transform: translate(-50%, 0px);
            }
        `}
`
