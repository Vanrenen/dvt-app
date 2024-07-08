var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { gql } from 'apollo-server-express';
export var typeDefs = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type User {\n    id: ID!\n    username: String!\n  }\n\n  type Token {\n    token: String!\n  }\n\n  type Query {\n    user(id: String!): User\n    users: [User!] \n  }\n\n  type Mutation {\n    registerUser(username: String!, password: String!): User\n    loginUser(username: String!, password: String!): Token\n  }\n"], ["\n  type User {\n    id: ID!\n    username: String!\n  }\n\n  type Token {\n    token: String!\n  }\n\n  type Query {\n    user(id: String!): User\n    users: [User!] \n  }\n\n  type Mutation {\n    registerUser(username: String!, password: String!): User\n    loginUser(username: String!, password: String!): Token\n  }\n"])));
var templateObject_1;
