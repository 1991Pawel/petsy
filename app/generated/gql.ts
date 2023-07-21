/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation CreateAccount($email: String!, $password: String!) {\n  createAccount(data: {email: $email, password: $password}) {\n    id\n  }\n}": types.CreateAccountDocument,
    "query getHotels {\n  hotels {\n    image {\n      url\n      id\n    }\n    id\n    name\n    address\n    description\n  }\n  reviews {\n    rating\n  }\n}\n\nquery getHotelById($id: ID!) {\n  hotel(where: {id: $id}) {\n    name\n    description\n    id\n    address\n    image {\n      id\n      url\n    }\n  }\n  reviews {\n    id\n    content\n    createdAt\n    rating\n    author\n  }\n}\n\nquery getHotelsId {\n  hotels {\n    id\n  }\n}\n\nfragment reviewContent on Review {\n  content\n  rating\n  id\n  author\n  creationDate\n}\n\nquery GetReviewsForHotelID($id: ID!) {\n  hotels(where: {id: $id}) {\n    id\n    name\n    review {\n      ...reviewContent\n    }\n  }\n}": types.GetHotelsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateAccount($email: String!, $password: String!) {\n  createAccount(data: {email: $email, password: $password}) {\n    id\n  }\n}"): (typeof documents)["mutation CreateAccount($email: String!, $password: String!) {\n  createAccount(data: {email: $email, password: $password}) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getHotels {\n  hotels {\n    image {\n      url\n      id\n    }\n    id\n    name\n    address\n    description\n  }\n  reviews {\n    rating\n  }\n}\n\nquery getHotelById($id: ID!) {\n  hotel(where: {id: $id}) {\n    name\n    description\n    id\n    address\n    image {\n      id\n      url\n    }\n  }\n  reviews {\n    id\n    content\n    createdAt\n    rating\n    author\n  }\n}\n\nquery getHotelsId {\n  hotels {\n    id\n  }\n}\n\nfragment reviewContent on Review {\n  content\n  rating\n  id\n  author\n  creationDate\n}\n\nquery GetReviewsForHotelID($id: ID!) {\n  hotels(where: {id: $id}) {\n    id\n    name\n    review {\n      ...reviewContent\n    }\n  }\n}"): (typeof documents)["query getHotels {\n  hotels {\n    image {\n      url\n      id\n    }\n    id\n    name\n    address\n    description\n  }\n  reviews {\n    rating\n  }\n}\n\nquery getHotelById($id: ID!) {\n  hotel(where: {id: $id}) {\n    name\n    description\n    id\n    address\n    image {\n      id\n      url\n    }\n  }\n  reviews {\n    id\n    content\n    createdAt\n    rating\n    author\n  }\n}\n\nquery getHotelsId {\n  hotels {\n    id\n  }\n}\n\nfragment reviewContent on Review {\n  content\n  rating\n  id\n  author\n  creationDate\n}\n\nquery GetReviewsForHotelID($id: ID!) {\n  hotels(where: {id: $id}) {\n    id\n    name\n    review {\n      ...reviewContent\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;