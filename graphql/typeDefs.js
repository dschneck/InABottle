const { gql } = require('apollo-server');

module.exports = gql` 
    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
    # "!" means that its required

    type Post {
        id: ID!
        body: String!
        createdAt: String! # Its going to take a little extra work to make this date
        username: String!
    }

    type User {
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }

    input RegisterInput {
        username: String!
        password: String!
        confirmedPassword: String!
        email: String!
    }

    type Query {
        getPosts: [Post]  
    }

    type Mutation {
        register(registerInput: RegisterInput): User!
    }
`;