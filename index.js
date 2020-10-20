// Dependancy Imports
const {  ApolloServer } = require('apollo-server'); // { x } destructures x
const gql = require('graphql-tag'); // dependency of appollo-server
const mongoose = require('mongoose');

// Relative imports
const config = require('./config.js');
const Post = require('./models/Post.js');
//const Post = require('./models/Post.js');

const typeDefs = gql` 
    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
    # "!" means that its required

    type Post {
        id: ID!
        body: String!
        createdAt: String! # Its going to take a little extra work to make this date
        username: String!
    }
    type Query {
        getPosts: [Post]  
    }
`;
const resolvers = {
    Query: {
        async getPosts() {
            try{
                const posts = await Post.find();
                return posts;
            }catch(error){
                throw new Error(err);
            }
            
        }
    }
};

const server = new ApolloServer({typeDefs, resolvers});

mongoose.connect(config.db.connection, {useNewUrlParser:true , useUnifiedTopology: true})
    .then(() => {
        console.log('MongoDb connected');
        return server.listen({port: 5000});
    })
    .then((res) => {
        console.log(`Server is running at ${res.url}`);
    });
    
