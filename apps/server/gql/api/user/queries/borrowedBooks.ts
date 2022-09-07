import type { QueryResolvers } from 'types/graphql'

export const borrowedBooks: QueryResolvers['borrowedBooks'] = async (_, __, { req }) =>
   req.user.user.getBooks({ where: { price: null } })
