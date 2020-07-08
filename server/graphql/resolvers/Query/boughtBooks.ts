import { Op } from 'sequelize'

export default async (_, __, context) => {
    await context.user.getBooks({
        where: {
            price: {
                [Op.ne]: null
            }
        }
    })
}
