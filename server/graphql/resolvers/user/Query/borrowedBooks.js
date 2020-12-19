import middlewares from '@middlewares'

export default async (_, __, context) => {
    middlewares.roleAuthorization(context, 'user')
    return await context.user.getBooks({
        where: {
            price: null
        }
    })
}
