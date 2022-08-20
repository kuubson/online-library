/* eslint-disable object-curly-newline */
import { gql } from '@apollo/client'

export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
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
   borrowBook: Book
}

export type MutationBorrowBookArgs = {
   bookId: Scalars['Int']
}

export type Query = {
   __typename?: 'Query'
   books: Array<Book>
   borrowedBooks: Array<Book>
   boughtBooks: Array<Book>
   freeBooks: Array<Book>
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
   user: Scalars['String']
}
