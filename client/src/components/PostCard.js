import React, { useContext } from 'react'
import { Card,Icon,Label,Image,Button} from 'semantic-ui-react'
import moment from 'moment'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'

const PostCard = ({post : {body,username,id,createdAt,comments,likes }}) => {
  const navigate = useNavigate();
     const { user } = useContext(AuthContext);
     function deletePostCallback() {
      navigate('/')
    }
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/molly.png'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`} >{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton post={{id,likes,user}}/>
      <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
      <Button color='blue' basic>
        <Icon name='comments' />
      </Button>
      <Label basic color='blue' pointing='left'>
        {comments.length}
      </Label>
    </Button>
    {user && user.username === username && (
      <DeleteButton postId={id} callback={deletePostCallback}/>
    )}
      </Card.Content>
    </Card> 
  )
}

export default PostCard