import { Connection, User, Message } from '@database'

export default async (req, res, __) => {
    await Connection.transaction(async transaction => {
        const messages = await Message.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name']
                }
            ],
            transaction
        }).then(books =>
            books.map(book => {
                return {
                    ...book.dataValues,
                    nameInitial: book.user.name.charAt(0)
                }
            })
        )
        res.send({
            messages,
            userId: req.user.id,
            nameInitial: req.user.name.charAt(0)
        })
    })
}
