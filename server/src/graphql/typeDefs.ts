export const typeDefs = `#graphql
  type User {
    id: String!
    fullName: String!
    email: String!
    avatarUrl: String!
    admin: Boolean!
  }

  type Query {
    users(admin: Boolean): [User!]!
    userById(id: String!): User
    userByEmail(email: String!): User
  }

  input CreateUserInput {
    email: String!
    fullName: String!
    password: String!
    avatarUrl: String!
    admin: Boolean!
  }

  input EditUserInput {
    email: String!
    fullName: String!
    admin: Boolean!
  }

  type Mutation {
    login(email: String!, password: String!): String
    createUser(input: CreateUserInput!): User!
    deleteUser(id: String!): ID
    editUser(id: String!, input: EditUserInput!): User!
  }
`;
