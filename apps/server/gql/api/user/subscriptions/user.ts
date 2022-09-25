import type { SubscriptionResolvers } from 'types/graphql'

export const user: SubscriptionResolvers['user'] = {
   subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('user') as unknown as AsyncIterable<any>,
}
