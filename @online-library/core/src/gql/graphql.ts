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

export type BooksQueryVariables = Exact<{
   ids: Array<Scalars['Int']> | Scalars['Int']
}>

export type BooksQuery = {
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

export type BorrowBookMutationVariables = Exact<{
   bookId: Scalars['Int']
}>

export type BorrowBookMutation = {
   __typename?: 'Mutation'
   borrowBook: { __typename?: 'Book'; title: string; author: string }
}

export type FreeAndPaidBooksQueryVariables = Exact<{
   freeBooksOffset: Scalars['Int']
   paidBooksOffset: Scalars['Int']
}>

export type FreeAndPaidBooksQuery = {
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

export type ProfileBooksQueryVariables = Exact<{ [key: string]: never }>

export type ProfileBooksQuery = {
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

export type UserSubscriptionVariables = Exact<{ [key: string]: never }>

export type UserSubscription = {
   __typename?: 'Subscription'
   user: { __typename?: 'User'; name: string }
}

export const BooksDocument = gql`
   query books($ids: [Int!]!) {
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
 * __useBooksQuery__
 *
 * To run a query within a React component, call `useBooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useBooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBooksQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useBooksQuery(
   baseOptions: Apollo.QueryHookOptions<BooksQuery, BooksQueryVariables>
) {
   const options = { ...defaultOptions, ...baseOptions }
   return Apollo.useQuery<BooksQuery, BooksQueryVariables>(BooksDocument, options)
}
export function useBooksLazyQuery(
   baseOptions?: Apollo.LazyQueryHookOptions<BooksQuery, BooksQueryVariables>
) {
   const options = { ...defaultOptions, ...baseOptions }
   return Apollo.useLazyQuery<BooksQuery, BooksQueryVariables>(BooksDocument, options)
}
export type BooksQueryHookResult = ReturnType<typeof useBooksQuery>
export type BooksLazyQueryHookResult = ReturnType<typeof useBooksLazyQuery>
export type BooksQueryResult = Apollo.QueryResult<BooksQuery, BooksQueryVariables>
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
export const FreeAndPaidBooksDocument = gql`
   query freeAndPaidBooks($freeBooksOffset: Int!, $paidBooksOffset: Int!) {
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
 * __useFreeAndPaidBooksQuery__
 *
 * To run a query within a React component, call `useFreeAndPaidBooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useFreeAndPaidBooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFreeAndPaidBooksQuery({
 *   variables: {
 *      freeBooksOffset: // value for 'freeBooksOffset'
 *      paidBooksOffset: // value for 'paidBooksOffset'
 *   },
 * });
 */
export function useFreeAndPaidBooksQuery(
   baseOptions: Apollo.QueryHookOptions<FreeAndPaidBooksQuery, FreeAndPaidBooksQueryVariables>
) {
   const options = { ...defaultOptions, ...baseOptions }
   return Apollo.useQuery<FreeAndPaidBooksQuery, FreeAndPaidBooksQueryVariables>(
      FreeAndPaidBooksDocument,
      options
   )
}
export function useFreeAndPaidBooksLazyQuery(
   baseOptions?: Apollo.LazyQueryHookOptions<FreeAndPaidBooksQuery, FreeAndPaidBooksQueryVariables>
) {
   const options = { ...defaultOptions, ...baseOptions }
   return Apollo.useLazyQuery<FreeAndPaidBooksQuery, FreeAndPaidBooksQueryVariables>(
      FreeAndPaidBooksDocument,
      options
   )
}
export type FreeAndPaidBooksQueryHookResult = ReturnType<typeof useFreeAndPaidBooksQuery>
export type FreeAndPaidBooksLazyQueryHookResult = ReturnType<typeof useFreeAndPaidBooksLazyQuery>
export type FreeAndPaidBooksQueryResult = Apollo.QueryResult<
   FreeAndPaidBooksQuery,
   FreeAndPaidBooksQueryVariables
>
export const ProfileBooksDocument = gql`
   query profileBooks {
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
 * __useProfileBooksQuery__
 *
 * To run a query within a React component, call `useProfileBooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileBooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileBooksQuery({
 *   variables: {
 *   },
 * });
 */
export function useProfileBooksQuery(
   baseOptions?: Apollo.QueryHookOptions<ProfileBooksQuery, ProfileBooksQueryVariables>
) {
   const options = { ...defaultOptions, ...baseOptions }
   return Apollo.useQuery<ProfileBooksQuery, ProfileBooksQueryVariables>(
      ProfileBooksDocument,
      options
   )
}
export function useProfileBooksLazyQuery(
   baseOptions?: Apollo.LazyQueryHookOptions<ProfileBooksQuery, ProfileBooksQueryVariables>
) {
   const options = { ...defaultOptions, ...baseOptions }
   return Apollo.useLazyQuery<ProfileBooksQuery, ProfileBooksQueryVariables>(
      ProfileBooksDocument,
      options
   )
}
export type ProfileBooksQueryHookResult = ReturnType<typeof useProfileBooksQuery>
export type ProfileBooksLazyQueryHookResult = ReturnType<typeof useProfileBooksLazyQuery>
export type ProfileBooksQueryResult = Apollo.QueryResult<
   ProfileBooksQuery,
   ProfileBooksQueryVariables
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
