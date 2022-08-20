import { FLOAT, Model, STRING, Sequelize, TEXT } from 'sequelize'

class BookValues extends Model {
   id: number
   title: string
   author: string
   cover: string
   price: number
}

export class Book extends BookValues {
   dataValues: BookValues
}

const BookModel = (sequelize: Sequelize) => {
   Book.init(
      {
         title: {
            type: STRING,
            allowNull: false,
         },
         author: {
            type: STRING,
            allowNull: false,
         },
         cover: {
            type: TEXT,
            allowNull: false,
         },
         price: {
            type: FLOAT,
         },
      },
      {
         sequelize,
         modelName: 'book',
      }
   )
   return Book
}

export default BookModel
