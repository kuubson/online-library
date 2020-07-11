import { Book } from '../../../database/database'

interface IArgs {
    ids: number[]
}

export default async (_, { ids }: IArgs) =>
    await Book.findAll({
        where: {
            id: ids
        }
    })
