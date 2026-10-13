import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Note {
    id: ID!
    title: String!
    text: String!
    author: User!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    users: [User!]!
    me: User
    notes: [Note!]!
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createNote(title: String!, text: String!): Note!
    deleteNote(id: ID!): Boolean!
  }
`;