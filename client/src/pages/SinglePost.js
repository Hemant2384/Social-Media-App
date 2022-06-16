import React, { useContext, useRef, useState } from 'react'
import { useMutation,useQuery } from '@apollo/client'
import { Button, Card, Form, Grid, Icon , Label, Image} from 'semantic-ui-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth'
import moment from 'moment'
import LikeButton from '../components/LikeButton'
import DeleteButton from '../components/DeleteButton'
import MyPopup from '../utils/MyPopup'
import { FETCH_POST_QUERY, SUBMIT_COMMENT_MUTATION } from '../utils/graphql'

const SinglePost = () => {
    const navigate = useNavigate();
    const commentInputRef = useRef(null);
    const [comment, setComment] = useState('');
    const { user } = useContext(AuthContext);
    const postID = useLocation();
    const postId = postID.pathname.substring(7,postID.pathname.length)
    const data = useQuery(FETCH_POST_QUERY,{
        variables : {postId},
    })
    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
        update(_,result) {
          setComment('');
          commentInputRef.current.blur();
        },
        variables: {
          postId,
          body: comment
        }
      });
    
      function deletePostCallback() {
        navigate('/')
      }
    
    // console.log(data.data);
    let postmarkUp;
    if(!data.data){
        postmarkUp = <p>Loading Post...</p>
    }else{
        const {
            id,
            body,
            createdAt,
            username,
            comments,
            likes
          } = data.data.getPost;
          postmarkUp = (
        <Grid>
          <Grid.Row>
            <Grid.Column width={2}>
              <Image
                src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                size="small"
                float="right"
              />
            </Grid.Column>
            <Grid.Column width={10}>
              <Card fluid>
                <Card.Content>
                  <Card.Header>{username}</Card.Header>
                  <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{body}</Card.Description>
                </Card.Content>
                <hr />
                <Card.Content extra>
                  <LikeButton user={user} post={{ id, likes, user }} />
                  <MyPopup content="Comment on post">
                    <Button
                      as="div"
                      labelPosition="right"
                      onClick={() => console.log('Comment on post')}
                    >
                      <Button basic color="blue">
                        <Icon name="comments" />
                      </Button>
                      <Label basic color="blue" pointing="left">
                        {comments.length}
                      </Label>
                    </Button>
                  </MyPopup>
                  {user && user.username === username && (
                    <DeleteButton postId={id} callback={deletePostCallback}/>
                  )}
                </Card.Content>
              </Card>
              {user && (
                <Card fluid>
                  <Card.Content>
                    <p>Post a comment</p>
                    <Form>
                      <div className="ui action input fluid">
                        <input
                          type="text"
                          placeholder="Comment.."
                          name="comment"
                          value={comment}
                          onChange={(event) => setComment(event.target.value)}
                          ref={commentInputRef}
                        />
                        <button
                          type="submit"
                          className="ui button teal"
                          disabled={comment.trim() === ''}
                          onClick={submitComment}
                        >
                          Submit
                        </button>
                      </div>
                    </Form>
                  </Card.Content>
                </Card>
              )}
              {comments.map((comment) => (
                <Card fluid key={comment.id}>
                  <Card.Content>
                    {user && user.username === comment.username && (
                      <DeleteButton postId={id} commentId={comment.id} />
                    )}
                    <Card.Header>{comment.username}</Card.Header>
                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                    <Card.Description>{comment.body}</Card.Description>
                  </Card.Content>
                </Card>
              ))}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
}
    return postmarkUp;
}

export default SinglePost;