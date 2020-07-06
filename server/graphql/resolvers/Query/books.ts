import { Book } from '../../../database/database'

export default async () => await Book.findAll()
