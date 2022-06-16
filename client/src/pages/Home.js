import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { Grid, Transition } from 'semantic-ui-react'
import PostCard from '../components/PostCard'
import { AuthContext } from '../context/auth'
import PostForm from '../components/PostForm'
import { FETCH_POSTS } from '../utils/graphql'

const Home = () => {
    const { user } = useContext(AuthContext);
    const{loading, data} = useQuery(FETCH_POSTS)
    const posts = data
  return (
    <Grid columns={3} divided>
    <Grid.Row className='page-title'>
        <h1>Recent Posts</h1>
    </Grid.Row>
    <Grid.Row>
        {user &&(
            <Grid.Column>
                <PostForm/>
            </Grid.Column>
        )}
        {loading ? (
            <h1>Loading Posts...</h1>
        ) : (
            <Transition.Group>
            {posts && posts.getPosts.map((post) => (
                <Grid.Column key={post.id} style={{marginBottom : 20}}>
                    <PostCard post={post}/>
                </Grid.Column>
            ))}
            </Transition.Group>
        )}
    </Grid.Row>
    </Grid>
  )
}



export default Home