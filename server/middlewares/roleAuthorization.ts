import { IContext } from '../graphql/resolvers/types'

export default (context: IContext, role: 'user' | 'admin') => {
    try {
        if (context.role !== role) {
            throw new Error('Authoritzation Error')
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
