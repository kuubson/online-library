import { t } from 'i18'

type BookPopupButtonTextProps = {
   price: number | null | undefined
   isInCart: boolean
}

export const bookPopupButtonText = ({ price, isInCart }: BookPopupButtonTextProps) =>
   price ? (isInCart ? t('buttons.bookInCart') : t('buttons.buy')) : t('buttons.borrow')
