/* eslint-disable object-curly-newline */
import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'

export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
const defaultOptions = {} as const
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

export type GetBooksQueryVariables = Exact<{
   ids: Array<Scalars['Int']> | Scalars['Int']
}>

export type GetBooksQuery = {
   __typename?: 'Query'
   books: Array<{
      __typename?: 'Book'
      id: number
      title: string
      author: string
      cover: string
      price?: number | null
   }>
}

export type GetProfileBooksQueryVariables = Exact<{ [key: string]: never }>

export type GetProfileBooksQuery = {
   __typename?: 'Query'
   boughtBooks: Array<{
      __typename?: 'Book'
      id: number
      title: string
      author: string
      cover: string
   }>
   borrowedBooks: Array<{
      __typename?: 'Book'
      id: number
      title: string
      author: string
      cover: string
   }>
}

export type GetFreeAndPaidBooksQueryVariables = Exact<{
   freeBooksOffset: Scalars['Int']
   paidBooksOffset: Scalars['Int']
}>

export type GetFreeAndPaidBooksQuery = {
   __typename?: 'Query'
   freeBooks: Array<{
      __typename?: 'Book'
      id: number
      title: string
      author: string
      cover: string
   }>
   paidBooks: Array<{
      __typename?: 'Book'
      id: number
      title: string
      author: string
      cover: string
      price?: number | null
   }>
}

export type UserSubscriptionVariables = Exact<{ [key: string]: never }>

export type UserSubscription = {
   __typename?: 'Subscription'
   user: { __typename?: 'User'; name: string }
}

export type BorrowBookMutationVariables = Exact<{
   bookId: Scalars['Int']
}>

export type BorrowBookMutation = {
   __typename?: 'Mutation'
   borrowBook: { __typename?: 'Book'; title: string; author: string }
}

export const GetBooksDocument = gql`
   query getBooks($ids: [Int!]!) {
      books(ids: $ids) {
         id
         title
         author
         cover
         price
      }
   }
`

/**
 * __useGetBooksQuery__
 *
 * To run a query within a React component, call `useGetBooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBooksQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useGetBooksQuery(
   baseOptions: Apollo.QueryHookOptions<GetBooksQuery, GetBooksQueryVariables>
) {
   const options = { ...defaultOptions, ...baseOptions }
   return Apollo.useQuery<GetBooksQuery, GetBooksQueryVariables>(GetBooksDocument, options)
}
export function useGetBooksLazyQuery(
   baseOptions?: Apollo.LazyQueryHookOptions<GetBooksQuery, GetBooksQueryVariables>
) {
   const options = { ...defaultOptions, ...baseOptions }
   return Apollo.useLazyQuery<GetBooksQuery, GetBooksQueryVariables>(GetBooksDocument, options)
}
export type GetBooksQueryHookResult = ReturnType<typeof useGetBooksQuery>
export type GetBooksLazyQueryHookResult = ReturnType<typeof useGetBooksLazyQuery>
export type GetBooksQueryResult = Apollo.QueryResult<GetBooksQuery, GetBooksQueryVariables>
export const GetProfileBooksDocument = gql`
   query getProfileBooks {
      boughtBooks {
         id
         title
         author
         cover
      }
      borrowedBooks {
         id
         title
         author
         cover
      }
   }
`

/**
 * __useGetProfileBooksQuery__
 *
 * To run a query within a React component, call `useGetProfileBooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileBooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileBooksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProfileBooksQuery(
   baseOptions?: Apollo.QueryHookOptions<GetProfileBooksQuery, GetProfileBooksQueryVariables>
) {
   const options = { ...defaultOptions, ...baseOptions }
   return Apollo.useQuery<GetProfileBooksQuery, GetProfileBooksQueryVariables>(
      GetProfileBooksDocument,
      options
   )
}
export function useGetProfileBooksLazyQuery(
   baseOptions?: Apollo.LazyQueryHookOptions<GetProfileBooksQuery, GetProfileBooksQueryVariables>
) {
   const options = { ...defaultOptions, ...baseOptions }
   return Apollo.useLazyQuery<GetProfileBooksQuery, GetProfileBooksQueryVariables>(
      GetProfileBooksDocument,
      options
   )
}
export type GetProfileBooksQueryHookResult = ReturnType<typeof useGetProfileBooksQuery>
export type GetProfileBooksLazyQueryHookResult = ReturnType<typeof useGetProfileBooksLazyQuery>
export type GetProfileBooksQueryResult = Apollo.QueryResult<
   GetProfileBooksQuery,
   GetProfileBooksQueryVariables
>
export const GetFreeAndPaidBooksDocument = gql`
   query getFreeAndPaidBooks($freeBooksOffset: Int!, $paidBooksOffset: Int!) {
      freeBooks(freeBooksOffset: $freeBooksOffset, paidBooksOffset: $paidBooksOffset) {
         id
         title
         author
         cover
      }
      paidBooks(paidBooksOffset: $paidBooksOffset, freeBooksOffset: $freeBooksOffset) {
         id
         title
         author
         cover
         price
      }
   }
`

/**
 * __useGetFreeAndPaidBooksQuery__
 *
 * To run a query within a React component, call `useGetFreeAndPaidBooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFreeAndPaidBooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFreeAndPaidBooksQuery({
 *   variables: {
 *      freeBooksOffset: // value for 'freeBooksOffset'
 *      paidBooksOffset: // value for 'paidBooksOffset'
 *   },
 * });
 */
export function useGetFreeAndPaidBooksQuery(
   baseOptions: Apollo.QueryHookOptions<GetFreeAndPaidBooksQuery, GetFreeAndPaidBooksQueryVariables>
) {
   const options = { ...defaultOptions, ...baseOptions }
   return Apollo.useQuery<GetFreeAndPaidBooksQuery, GetFreeAndPaidBooksQueryVariables>(
      GetFreeAndPaidBooksDocument,
      options
   )
}
export function useGetFreeAndPaidBooksLazyQuery(
   baseOptions?: Apollo.LazyQueryHookOptions<
      GetFreeAndPaidBooksQuery,
      GetFreeAndPaidBooksQueryVariables
   >
) {
   const options = { ...defaultOptions, ...baseOptions }
   return Apollo.useLazyQuery<GetFreeAndPaidBooksQuery, GetFreeAndPaidBooksQueryVariables>(
      GetFreeAndPaidBooksDocument,
      options
   )
}
export type GetFreeAndPaidBooksQueryHookResult = ReturnType<typeof useGetFreeAndPaidBooksQuery>
export type GetFreeAndPaidBooksLazyQueryHookResult = ReturnType<
   typeof useGetFreeAndPaidBooksLazyQuery
>
export type GetFreeAndPaidBooksQueryResult = Apollo.QueryResult<
   GetFreeAndPaidBooksQuery,
   GetFreeAndPaidBooksQueryVariables
>
export const UserDocument = gql`
   subscription User {
      user {
         name
      }
   }
`

/**
 * __useUserSubscription__
 *
 * To run a query within a React component, call `useUserSubscription` and pass it any options that fit your needs.
 * When your component renders, `useUserSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserSubscription({
 *   variables: {
 *   },
 * });
 */
export function useUserSubscription(
   baseOptions?: Apollo.SubscriptionHookOptions<UserSubscription, UserSubscriptionVariables>
) {
   const options = { ...defaultOptions, ...baseOptions }
   return Apollo.useSubscription<UserSubscription, UserSubscriptionVariables>(UserDocument, options)
}
export type UserSubscriptionHookResult = ReturnType<typeof useUserSubscription>
export type UserSubscriptionResult = Apollo.SubscriptionResult<UserSubscription>
export const BorrowBookDocument = gql`
   mutation borrowBook($bookId: Int!) {
      borrowBook(bookId: $bookId) {
         title
         author
      }
   }
`
export type BorrowBookMutationFn = Apollo.MutationFunction<
   BorrowBookMutation,
   BorrowBookMutationVariables
>

/**
 * __useBorrowBookMutation__
 *
 * To run a mutation, you first call `useBorrowBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBorrowBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [borrowBookMutation, { data, loading, error }] = useBorrowBookMutation({
 *   variables: {
 *      bookId: // value for 'bookId'
 *   },
 * });
 */
export function useBorrowBookMutation(
   baseOptions?: Apollo.MutationHookOptions<BorrowBookMutation, BorrowBookMutationVariables>
) {
   const options = { ...defaultOptions, ...baseOptions }
   return Apollo.useMutation<BorrowBookMutation, BorrowBookMutationVariables>(
      BorrowBookDocument,
      options
   )
}
export type BorrowBookMutationHookResult = ReturnType<typeof useBorrowBookMutation>
export type BorrowBookMutationResult = Apollo.MutationResult<BorrowBookMutation>
export type BorrowBookMutationOptions = Apollo.BaseMutationOptions<
   BorrowBookMutation,
   BorrowBookMutationVariables
>
