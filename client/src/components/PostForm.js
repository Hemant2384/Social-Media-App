import { useMutation } from '@apollo/client';
import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import { CREATE_POST_MUTATION, FETCH_POSTS } from '../utils/graphql';
import { useForm } from '../utils/UseForm'

const PostForm = () => {
    const createPostCallback = () => {
        createPost();
    }
    const{onChange,onSubmit,values} = useForm(createPostCallback,{
        body : ''
    });
    const[createPost,{error}] = useMutation(CREATE_POST_MUTATION,{
        variables : values,
        update(proxy,result){
          //all data in cache is sitting in data variable
          const data = proxy.readQuery({
            query : FETCH_POSTS
          })
          proxy.writeQuery({query : FETCH_POSTS, 
          data : {
            getPosts : [result.data.createPost,...data.getPosts]
          }
        })
          values.body=""
        }
    })

  return (
    <>
    <Form onSubmit={onSubmit}>
        <h2>Create a post</h2>

        <Form.Field>
        <Form.Input
            placeholder = 'Hii world'
            name='body'
            values = {values.body}
            onChange={onChange}
            error = {error ? true : false}
            />
            <Button type='submit' color='teal'>Submit</Button>
        </Form.Field>
    </Form>
    {error && (
      <div className="ui error message" style={{ marginBottom: 20 }}>
        <ul className="list">
          <li>{error.graphQLErrors[0].message}</li>
        </ul>
      </div>
    )}
    </>
  )
}


export default PostForm