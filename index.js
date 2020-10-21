// Dependancy Imports
const {  ApolloServer } = require('apollo-server'); // { x } destructures x
const gql = require('graphql-tag'); // dependency of appollo-server
const mongoose = require('mongoose');

// Relative imports
const config = require('./config.js');
const typeDefs = require('./graphql/typeDefs.js');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({typeDefs, resolvers});

mongoose.connect(config.db.connection, {useNewUrlParser:true , useUnifiedTopology: true})
    .then(() => {
        console.log('MongoDb connected');
        return server.listen({port: 5000});
    })
    .then((res) => {
        console.log(`Server is running at ${res.url}`);
    });
    
