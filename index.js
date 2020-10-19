const {  ApolloServer } = require('apollo-server');

const gql = require('graphql-tag'); // dependency of appollo-server

// "!" means that its required
const typeDefs = gql` 
    type Query {
        sayHi: String!  
    }
`
const resolvers = {
    Query: {
        sayHi: () => 'Hello World!'
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen({port: 5000})
    .then(res => {
        console.log(`Server running at ${res.url}`);
    })