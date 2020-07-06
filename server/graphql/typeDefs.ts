import { gql } from 'apollo-server'

export default gql`
    type Book {
        id: ID!
        title: String!
        author: String!
        cover: String!
    }
    type Query {
        books: [Book!]!
    }
`
