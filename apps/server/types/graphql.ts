/* eslint-disable @typescript-eslint/ban-types */

/* eslint-disable @typescript-eslint/consistent-type-imports */
import { GraphQLResolveInfo } from 'graphql'

import { GraphqlContext } from './'

export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
   ID: string
   String: string
   Boolean: boolean
   Int: number
   Float: number
}

export type Book = {
   __typename?: 'Book'
   author: Scalars['String']
   cover: Scalars['String']
   id: Scalars['Int']
   price?: Maybe<Scalars['Float']>
   title: Scalars['String']
}

export type Mutation = {
   __typename?: 'Mutation'
   /**
    * Assigns certain book to the user.
    *
    * Checks if user has already borrowed certain book.
    */
   borrowBook: Book
}

export type MutationBorrowBookArgs = {
   bookId: Scalars['Int']
}

export type Query = {
   __typename?: 'Query'
   /** Fetches books based on ids of books that user put in the cart. */
   books: Array<Book>
   /** Fetches books that user has borrowed. */
   borrowedBooks: Array<Book>
   /** Fetches books that user has bought. */
   boughtBooks: Array<Book>
   /**
    * Fetches free books availabe in the store.
    *
    * Implements lazy loading (on button click).
    */
   freeBooks: Array<Book>
   /**
    * Fetches paid books availabe in the store.
    *
    * Implements lazy loading (on button click).
    */
   paidBooks: Array<Book>
}

export type QueryBooksArgs = {
   ids: Array<Scalars['Int']>
}

export type QueryFreeBooksArgs = {
   freeBooksOffset: Scalars['Int']
   paidBooksOffset: Scalars['Int']
}

export type QueryPaidBooksArgs = {
   freeBooksOffset: Scalars['Int']
   paidBooksOffset: Scalars['Int']
}

export type Subscription = {
   __typename?: 'Subscription'
   /** Just a temporary subscription. */
   user: User
}

export type User = {
   __typename?: 'User'
   name: Scalars['String']
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
   resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
   | ResolverFn<TResult, TParent, TContext, TArgs>
   | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
   parent: TParent,
   args: TArgs,
   context: TContext,
   info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
   parent: TParent,
   args: TArgs,
   context: TContext,
   info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
   parent: TParent,
   args: TArgs,
   context: TContext,
   info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
   TResult,
   TKey extends string,
   TParent,
   TContext,
   TArgs
> {
   subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
   resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
   subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
   resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
   | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
   | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
   TResult,
   TKey extends string,
   TParent = {},
   TContext = {},
   TArgs = {}
> =
   | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
   | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
   parent: TParent,
   context: TContext,
   info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
   obj: T,
   context: TContext,
   info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
   next: NextResolverFn<TResult>,
   parent: TParent,
   args: TArgs,
   context: TContext,
   info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
   Book: ResolverTypeWrapper<Book>
   Boolean: ResolverTypeWrapper<Scalars['Boolean']>
   Float: ResolverTypeWrapper<Scalars['Float']>
   Int: ResolverTypeWrapper<Scalars['Int']>
   Mutation: ResolverTypeWrapper<{}>
   Query: ResolverTypeWrapper<{}>
   String: ResolverTypeWrapper<Scalars['String']>
   Subscription: ResolverTypeWrapper<{}>
   User: ResolverTypeWrapper<User>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
   Book: Book
   Boolean: Scalars['Boolean']
   Float: Scalars['Float']
   Int: Scalars['Int']
   Mutation: {}
   Query: {}
   String: Scalars['String']
   Subscription: {}
   User: User
}

export type BookResolvers<
   ContextType = GraphqlContext,
   ParentType extends ResolversParentTypes['Book'] = ResolversParentTypes['Book']
> = {
   author?: Resolver<ResolversTypes['String'], ParentType, ContextType>
   cover?: Resolver<ResolversTypes['String'], ParentType, ContextType>
   id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
   price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
   title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
   __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MutationResolvers<
   ContextType = GraphqlContext,
   ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
   borrowBook?: Resolver<
      ResolversTypes['Book'],
      ParentType,
      ContextType,
      RequireFields<MutationBorrowBookArgs, 'bookId'>
   >
}

export type QueryResolvers<
   ContextType = GraphqlContext,
   ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
   books?: Resolver<
      Array<ResolversTypes['Book']>,
      ParentType,
      ContextType,
      RequireFields<QueryBooksArgs, 'ids'>
   >
   borrowedBooks?: Resolver<Array<ResolversTypes['Book']>, ParentType, ContextType>
   boughtBooks?: Resolver<Array<ResolversTypes['Book']>, ParentType, ContextType>
   freeBooks?: Resolver<
      Array<ResolversTypes['Book']>,
      ParentType,
      ContextType,
      RequireFields<QueryFreeBooksArgs, 'freeBooksOffset' | 'paidBooksOffset'>
   >
   paidBooks?: Resolver<
      Array<ResolversTypes['Book']>,
      ParentType,
      ContextType,
      RequireFields<QueryPaidBooksArgs, 'freeBooksOffset' | 'paidBooksOffset'>
   >
}

export type SubscriptionResolvers<
   ContextType = GraphqlContext,
   ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']
> = {
   user?: SubscriptionResolver<ResolversTypes['User'], 'user', ParentType, ContextType>
}

export type UserResolvers<
   ContextType = GraphqlContext,
   ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
   name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
   __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type Resolvers<ContextType = GraphqlContext> = {
   Book?: BookResolvers<ContextType>
   Mutation?: MutationResolvers<ContextType>
   Query?: QueryResolvers<ContextType>
   Subscription?: SubscriptionResolvers<ContextType>
   User?: UserResolvers<ContextType>
}
