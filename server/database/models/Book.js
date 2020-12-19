import { Model, STRING, TEXT, FLOAT } from 'sequelize'

export default sequelize => {
    class Book extends Model {}
    Book.init(
        {
            title: {
                type: STRING,
                allowNull: false
            },
            author: {
                type: STRING,
                allowNull: false
            },
            cover: {
                type: TEXT,
                allowNull: false
            },
            price: {
                type: FLOAT
            }
        },
        {
            sequelize,
            modelName: 'book'
        }
    )
    return Book
}
