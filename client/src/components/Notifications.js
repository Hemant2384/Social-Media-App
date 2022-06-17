import { useQuery } from "@apollo/client";
import moment from "moment";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import { FETCH_POSTS } from "../utils/graphql";

const Notifications = () => {
  const navigate = useNavigate();
  const { loading, data } = useQuery(FETCH_POSTS);
  const friendOptions = data ? data.getPosts : [];
  let dropwdowndata = [];
  if (friendOptions.length > 0) {
    friendOptions.map((index) => {
      dropwdowndata.push({
        key: index.id,
        text: `${index.username} posted a new post at ${moment(
          index.createdAt
        ).fromNow(true)}`,
      });
    });
  }
  return (
    <>
      <Dropdown
        text="Notifications"
        style={{ width: "30rem", marginTop: "0.9em", marginBottom: "0.3em" }}
        selection
      >
        <Dropdown.Menu>
          {dropwdowndata.map((item) => {
            return (
              <>
                <Dropdown.Item
                  text={item.text}
                  onClick={() => navigate(`/posts/${item.key}`)}
                />
              </>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default Notifications;
