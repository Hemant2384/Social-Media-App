import { useMutation } from "@apollo/client";
import React, {useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Label, Button, Icon } from "semantic-ui-react";
import { LIKE_POST_MUTATION } from "../utils/graphql";

const LikeButton = ({ post: { id, likes, user } }) => {
  const [liked, setliked] = useState(false);
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setliked(true);
    } else {
      setliked(false);
    }
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  const likeButton = user ? (
    liked ? (
      <Button color="teal">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="teal" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="teal" basic>
      <Icon name="heart" />
    </Button>
  );
  return (
    <Button as="div" labelPosition="right" onClick={likePost}>
      {likeButton}
      <Label basic color="teal" pointing="left">
        {likes.length}
      </Label>
    </Button>
  );
};

export default LikeButton;
