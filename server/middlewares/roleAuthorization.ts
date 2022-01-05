import { GraphQLResolverContext } from 'types/graphql'

export const roleAuthorization = (context: GraphQLResolverContext, role: 'user') => {
    try {
        if (context.role !== role) {
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
