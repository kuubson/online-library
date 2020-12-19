import { gql } from 'apollo-server'

export default gql`
    type Book {
        id: ID!
        title: String!
        author: String!
        cover: String!
        price: Float
    }
    extend type Query {
        books(ids: [ID!]!): [Book!]!
        booksSuggestions(title: String!, author: String!, withProfile: Boolean!): [Book!]!
        freeBooks: [Book!]!
        paidBooks: [Book!]!
        boughtBooks: [Book!]!
        borrowedBooks: [Book!]!
    }
    extend type Mutation {
        borrowBook(bookId: ID!): Book!
    }
`
