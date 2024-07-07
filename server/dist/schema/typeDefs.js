import { gql } from 'apollo-server-express';
const typeDefs = gql `
  type User {
    id: ID!
    username: String!
  }

  type Token {
    token: String!
  }

  type Query {
    user(id: String!): User
    users: [User!]
  }

  type Mutation {
    registerUser(username: String!, password: String!): User
    loginUser(username: String!, password: String!): Token
  }
`;
export default typeDefs;
