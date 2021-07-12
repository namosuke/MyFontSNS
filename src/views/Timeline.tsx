import React from 'react';
import { Link } from 'react-router-dom';
import { usePosts } from '../util/fetch';
import setFontLinkIcon from '../assets/set-font-link.svg';
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
      <div className="set-font-link">
        <Link to="/post">
          <img src={setFontLinkIcon} alt="A link to set font" />
        </Link>
      </div>
    </>
  );
};

export default Timeline;
