import { gql } from 'apollo-server'

export default gql`
    type Book {
        id: ID!
        title: String!
        author: String!
        cover: String!
        price: Float
    }
    type Query {
        freeBooks: [Book!]!
        paidBooks: [Book!]!
        booksSuggestions(title: String!, author: String!, withProfile: Boolean!): [Book!]!
        borrowedBooks: [Book!]!
        boughtBooks: [Book!]!
        cart(ids: [ID]): [Book!]!
    }
    type Mutation {
        borrowBook(bookId: ID!): Book!
    }
`
