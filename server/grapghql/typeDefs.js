const {gql} = require('apollo-server');

module.exports = gql`
     type Post{
        id: ID!
        body: String!
        username: String!
        createdAt: String!
        comments: [Comment]!
        likes: [Likes]!
    }
    type Comment{
        id: ID!
        body: String!
        username: String!
        createdAt: String!
    }
    type Likes{
        id: ID!
        createdAt: String!
        username: String!
    }
     type Query{
        getPosts: [Post]
        getPost(postId: ID!) : Post
     }
     input RegisterInput{
      username: String!
      email: String!
      password: String!
      confirmPassword: String!
     }
     type User{
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
     }
     type Mutation{
        register(registerInput: RegisterInput): User!
        login(username: String!, password:String!) : User!
        createPost(body: String!) : Post!
        deletePost(postId: ID!) : String!
        createComment(postId: ID!, body: String): Post!
        deleteComment(postId: ID!, commentId: ID!): Post!
        likePost(postId: ID!): Post!
     }
`;