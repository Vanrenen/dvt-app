import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
  }

  type Product {
    id: String
    title: String
    price: String
    description: String
    image: String
  }

  type Token {
    token: String!
  }

  type Query {
    user(id: String!): User
    users: [User!]
    products: [Product!]
    product(id: String!): Product
    productsCategories: [String]
    productsCategory(category: String!): [Product!]
  }

  type Mutation {
    registerUser(username: String!, password: String!): User
    loginUser(username: String!, password: String!): Token
  }
`;
