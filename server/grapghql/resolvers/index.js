const postsResolver = require('./post')
const usersResolver = require('./user')
const commentResolver = require('./comments')
module.exports = {
    Query : {
        ...postsResolver.Query,
    },
    Mutation : {
        ...usersResolver.Mutation,
        ...postsResolver.Mutation,
        ...commentResolver.Mutation
    }
}