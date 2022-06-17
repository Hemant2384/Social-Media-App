import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { Button, Grid, Transition } from 'semantic-ui-react'
import PostCard from '../components/PostCard'
import { AuthContext } from '../context/auth'
import PostForm from '../components/PostForm'
import { FETCH_POSTS } from '../utils/graphql'

const Home = () => {
    const { user } = useContext(AuthContext);
    const[newpost,setNewPost] = useState(false);
    const{loading,data} = useQuery(FETCH_POSTS)
    const posts = data ? data : ''
    useEffect(() => {
        setNewPost(true)
    },[data])
    const handleclick = () => {
        window.location.reload();
        setNewPost(false)
    }
  return (
    <Grid columns={3} divided>
    <Grid.Row className='page-title'>
        <h1>Recent Posts</h1>
    </Grid.Row>
    {newpost  && <Button onClick={handleclick}>View New Posts</Button>}
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