import React from 'react';
import { usePosts } from '../util/fetch';
import Loading from '../components/Loading';
import Post from '../components/Post';

const Timeline = () => {
  const posts = usePosts();

  if (!posts) return <Loading className="load-icon" />;

  return (
    <>
      {
        posts.map((post) => (
          <Post post={post} />
        ))
      }
    </>
  );
};

export default Timeline;
