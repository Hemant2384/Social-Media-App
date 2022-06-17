const {ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');
const dbConnection = require('./config/db_config');

const typeDefs = require('./grapghql/typeDefs') 
const resolvers = require('./grapghql/resolvers') 

 const PORT = process.env.port || 5000

dbConnection();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context : ({req}) => ({req})
})

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    server.listen().then(({port : PORT}) => {
        console.log(`Started at ${PORT}`);
    }).catch(err => {
        console.log(err);
    })
});

