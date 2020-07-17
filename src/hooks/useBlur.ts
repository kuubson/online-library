import hooks from 'hooks'

export default () => {
    const { isLoading } = hooks.useLoader()
    const { shouldFeedbackHandlerAppear } = hooks.useFeedbackHandler()
    return isLoading || shouldFeedbackHandlerAppear
}
