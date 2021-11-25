import PropTypes from "prop-types";
import React from "react";
import LikeButton from "./LikeButton";
import PostCanvas from "./postCanvas";

export interface PostProps {
  post: any;
}

function Post({ post }: PostProps) {
  return (
    <div key={post.id} className="ml-3 inline-flex rounded-md box-container">
      <div
        className="
          items-center
          justify-center
          px-5
          py-3
          border
          border-transparent
          text-base
          font-medium
          rounded-md
          text-indigo-600
          hover:bg-indigo-50i
          post-card
        "
      >
        <p className="text-lg name-tag">{post.user.name}</p>
        <PostCanvas text={post.text} />
        <div className="post-bottom">
          <LikeButton />
        </div>
      </div>
    </div>
  );
}

Post.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  post: PropTypes.object.isRequired,
};

export default Post;
