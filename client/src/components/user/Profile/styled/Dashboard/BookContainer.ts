import styled, { css } from 'styled-components'

type BookContainer = {
    withFlips?: boolean
    isRead?: boolean
}

export default styled.div<BookContainer>`
    width: 400px;
    height: 400px;
    perspective: 1000px;
    transition: transform 1s ease-in-out, width 0.5s ease-in-out, height 0.5s ease-in-out;
    @media (max-width: 700px) {
        width: 350px;
        height: 300px;
    }
    @media (max-width: 500px) {
        width: 250px;
    }
    ${({ withFlips }) =>
        withFlips
            ? css`
                  transform: translateX(50%);
                  width: 450px;
                  @media (max-width: 1000px) {
                      width: 90%;
                  }
                  @media (max-width: 900px) {
                      width: 60%;
                  }
                  @media (max-width: 700px) {
                      width: 60%;
                  }
                  @media (max-width: 600px) {
                      width: 55%;
                  }
              `
            : null};
    ${({ isRead }) =>
        isRead
            ? css`
                  transform: translateX(100%);
                  @media (max-width: 700px) {
                      width: 350px;
                      height: 300px;
                  }
                  @media (max-width: 500px) {
                      width: 250px;
                  }
              `
            : null};
`
