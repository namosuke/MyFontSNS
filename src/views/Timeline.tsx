import React from 'react';
import { Link } from 'react-router-dom';
import { usePosts } from '../util/fetch';

import setFontLinkIcon from '../assets/set-font-link.svg';
import Loading from '../components/Loading';

const Timeline = () => {
  const posts = usePosts();

  if (!posts) return <Loading className="load-icon" />;

  return (
    <>
      {
        posts.map((post) => (
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
              <p className="px-5 py-3">{post.text}</p>
              <div className="post-bottom" />
            </div>
          </div>
        ))
      }
      <div className="set-font-link">
        <Link to="/font/set">
          <img src={setFontLinkIcon} alt="A link to set font" />
        </Link>
      </div>
    </>
  );
};

export default Timeline;
