import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation RegisterUser($username: String!, $password: String!) {
    registerUser(username: $username, password: $password) {
      id
      username
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
    }
  }
`;
