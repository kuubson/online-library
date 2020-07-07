import { gql } from 'apollo-server'

export default gql`
    type FreeBook {
        id: ID!
        title: String!
        author: String!
        cover: String!
    }
    type PaidBook {
        id: ID!
        title: String!
        author: String!
        cover: String!
        price: Float
    }
    type Query {
        freeBooks: [FreeBook!]!
        paidBooks: [PaidBook!]!
    }
`
