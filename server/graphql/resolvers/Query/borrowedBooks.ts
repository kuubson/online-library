export default async (_, __, context) => {
    await context.user.getBooks({
        where: {
            price: null
        }
    })
}
