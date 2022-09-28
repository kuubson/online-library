import { paypalModalActions } from '@redux/reducers/paypalModal'

import { useAction, useSelector } from 'hooks'

export const usePaypalModal = () => {
   const { showPayPalModal } = useSelector(state => state.paypalModal)

   const setShowPayPalModal = useAction(paypalModalActions.setShowPayPalModal)

   return {
      showPayPalModal,
      setShowPayPalModal,
   }
}
