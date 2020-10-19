const {  ApolloServer } = require('apollo-server'); // { x } destructures x
const gql = require('graphql-tag'); // dependency of appollo-server
const mongoose = require('mongoose');
const { MONGODB } = require('./config.js');

const typeDefs = gql` 
    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
    # "!" means that its required

    type Query {
        sayHi: String!  
    }
`;
const resolvers = {
    Query: {
        sayHi: () => 'Hello World!'
    }
}

const server = new ApolloServer({typeDefs, resolvers});

mongoose.connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDb connected');
        return server.listen({port: 5000});
    })
    .then((res) => {
        console.log(`Server is running at ${res.url}`);
    });
    
