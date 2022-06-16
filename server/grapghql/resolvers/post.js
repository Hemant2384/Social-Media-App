const Post = require('../../models/Posts');
const checkAuth = require('../../util/checkAuth');
const { AuthenticationError } = require('apollo-server');

module.exports = {
    Query : {
        async getPosts(){
            try{
                const allposts = await Post.find().sort({createdAt : -1});
                return allposts
            } catch(err){
                throw new Error(err);
            }
        },
        async getPost(_,{ postId }){
            try{
                const post = await Post.findById(postId);
                if(post){
                    return post
                }else{
                    throw new Error('Post not found')
                }
            }catch(err){
                    throw new Error(err)
            }
        }
    },
    Mutation : {
        //We have th req body in context and get authorization headers
        //User will login and get an authentication token, and user needs to put it in authorization header and send the header with the request
        //Backend gets the token and then decode and get the information taht user is authenticated and allowed to make a post
        async createPost(_,{ body },context){
            const user = checkAuth(context);
            //now we can proceed
            if(body.trim() === ''){
                throw new Error('Post must not be empty');
            }
            
            const newPost = new Post({
                body,
                user: user.id, // in post schema
                username: user.username,
                createdAt: new Date().toISOString()
            })
            const post = await newPost.save();
            return post
        },
        async deletePost(_,{ postId },context){
            const user = checkAuth(context);

            //user should be allowed to delete his own post
            try{
                const post = await Post.findById(postId);
                if(user.username === post.username){
                    await post.delete();
                    return 'Post deleted succesfully'
                }else{
                    throw new AuthenticationError('Action not allowed')
                }
            }catch(err){
                    throw new Error(err)
            }
        },
        async likePost(_,{postId},context){
            const {username} = checkAuth(context);
            const post = await Post.findById(postId);
            if(post){
            if(post.likes.find(like => like.username===username)){
                //post already liked,unlike it
                post.likes = post.likes.filter(like => like.username !== username)
            }else{
                post.likes.push({
                    username,
                    createdAt : new Date().toISOString()
                })
            }
            await post.save();
            return post;
        }else throw new UserInputError('Post not found');
        }
    }
}
