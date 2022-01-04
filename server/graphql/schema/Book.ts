import { gql } from 'apollo-server'

const Book = gql`
    type Book {
        id: ID!
        title: String!
        author: String!
        cover: String!
        price: Float
    }
    extend type Query {
        books(ids: [ID!]!): [Book!]!
        freeBooks(freeBooksOffset: Int!, paidBooksOffset: Int!): [Book!]!
        paidBooks(paidBooksOffset: Int!, freeBooksOffset: Int!): [Book!]!
        boughtBooks: [Book!]!
        borrowedBooks: [Book!]!
    }
    extend type Mutation {
        borrowBook(bookId: ID!): Book!
    }
`

export default Book
