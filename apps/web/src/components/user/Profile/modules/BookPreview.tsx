import { useEffect, useState } from 'react'

import { t, useBookPopup } from '@online-library/core'

import { Button, PopupContainer } from 'styles/styled'

import * as Styled from '../styled/BookPreview'
import { ButtonsContainer, Content, ContentContainer } from 'components/shared/BookPopup/styled'

import { Book } from 'components/shared'

export const BookPreview = () => {
   const { id, title, author, cover, price, resetBookPopup } = useBookPopup()

   const [pages] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

   const [currentPage, setCurrentPage] = useState(0)

   const [opened, setOpened] = useState(false)

   const [read, setRead] = useState(false)

   useEffect(() => {
      setOpened(currentPage > 0)
      setRead(currentPage >= pages.length - 1)
   }, [currentPage])

   return (
      <PopupContainer>
         <ContentContainer withFlips>
            <Styled.BookContainer withFlips={opened} read={read}>
               {pages.map((_, index) => (
                  <Styled.Page
                     key={index}
                     flip={opened && (index === currentPage || index <= currentPage)}
                     zIndex={index <= currentPage ? 1 : -index}
                  >
                     {index === 0 ? (
                        <Book
                           id={id}
                           title={title}
                           author={author}
                           cover={cover}
                           price={price}
                           withPopup
                           withFlips
                        />
                     ) : (
                        <Styled.PageContent>FRONT {index}</Styled.PageContent>
                     )}
                     <Styled.PageContent back>BACK {index}</Styled.PageContent>
                  </Styled.Page>
               ))}
            </Styled.BookContainer>
            <Content withFlips>
               <ButtonsContainer>
                  {opened ? (
                     <>
                        <Button onClick={() => setCurrentPage(0)} notAbsolute withoutFixedWidth>
                           {t('buttons.firstPage')}
                        </Button>
                        <Button
                           onClick={() => setCurrentPage(currentPage => currentPage - 1)}
                           notAbsolute
                           withoutFixedWidth
                        >
                           {t('buttons.previousPage')}
                        </Button>
                        <Button
                           onClick={() => {
                              if (!read) {
                                 setCurrentPage(currentPage => currentPage + 1)
                              }
                           }}
                           notAbsolute
                           withoutFixedWidth
                           withMarginLeft
                        >
                           {t('buttons.nextPage')}
                        </Button>
                     </>
                  ) : (
                     <>
                        <Button
                           onClick={() => setCurrentPage(currentPage => currentPage + 1)}
                           notAbsolute
                           withoutFixedWidth
                        >
                           {t('buttons.read')}
                        </Button>
                        <Button onClick={resetBookPopup} notAbsolute withoutFixedWidth>
                           {t('buttons.close')}
                        </Button>
                     </>
                  )}
               </ButtonsContainer>
            </Content>
         </ContentContainer>
      </PopupContainer>
   )
}
