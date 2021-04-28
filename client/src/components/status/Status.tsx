import React from "react";
import AppNav from "../AppNav";
import { Avatar, Button } from "@material-ui/core";
import FlipMove from "react-flip-move";
import "./Status.scss";
import Post from "../post/Post";
import { Container } from "reactstrap";

const Status: React.FC<{}> = () => {
  return (
    <>
      <AppNav />
      <Container className="d-flex align-items-center justify-content-center">
        <div className="feed">
          <div className="feed__header">
            <h2>Home</h2>
          </div>

          <div className="feed__tweetBox">
            <form>
              <div className="feed__tweetBox__input">
                {/* <Avatar src="https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png" /> */}
                <input
                  // onChange={(e) => setTweetMessage(e.target.value)}
                  // value={tweetMessage}
                  placeholder="Share your status with friends?"
                  type="text"
                />
              </div>

              <Button
                // onClick={sendTweet}
                type="submit"
                className="feed__tweetBox__tweetButton"
              >
                Tweet
              </Button>
            </form>
          </div>

          {/* <FlipMove>
        {posts.map((post) => (
          <Post
            key={post.text}
            displayName={post.displayName}
            username={post.username}
            verified={post.verified}
            text={post.text}
            avatar={post.avatar}
            image={post.image}
          />
         ))}
      </FlipMove> */}
        </div>
      </Container>
    </>
  );
};

export default Status;
