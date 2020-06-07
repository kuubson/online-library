import { useSelector } from 'react-redux'

import { RootState } from 'redux/reducers'

import hooks from 'hooks'

export default () => {
    const { isLoading } = useSelector((state: RootState) => state.loader)
    const { shouldFeedbackHandlerAppear } = hooks.useFeedbackHandler()
    return isLoading || shouldFeedbackHandlerAppear
}
