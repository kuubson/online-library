import { GraphQLContext } from 'types/graphql'

export const roleAuthorization = (context: GraphQLContext, role = 'user') => {
    try {
        if (context.req.user.role !== role) {
            throw new Error('Authorization Error')
        }
    } catch (error) {
        context.res
            .clearCookie('token', {
                secure: process.env.NODE_ENV === 'production',
                httpOnly: true,
                sameSite: true
            })
            .status(401)
    }
}
