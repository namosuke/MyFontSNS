import React from 'react';
import { useCurrentUser, usePosts } from '../util/fetch';

import Loading from '../components/Loading';

const Profile = () => {
  const currentUser = useCurrentUser();
  const posts = usePosts();

  if (!currentUser || !posts) return <Loading className="load-icon" />;

  return (
    <>
      <div className="profile-container">

        <div className="profile-main-container grid">
          <div className="left-container">
            <Loading className="profile-icon" />
            <h2>{currentUser.name}</h2>
            <h3>{`@${currentUser.screen_id}`}</h3>
            <div className="follow-container">
              <p>{`フォロー${currentUser.follow.length}`}</p>
              <p>{`フォロワー${currentUser.follower.length}`}</p>
            </div>
          </div>

          <div className="right-container">
            {
              currentUser.tags.map((tag) => (
                <p
                  key={tag}
                  className={[
                    'flex', 'items-center', 'justify-center',
                    'px-1', 'py-1',
                    'border', 'border-transparent',
                    'text-base', 'font-medium', 'text-white',
                    'rounded-md',
                    'bg-indigo-600', 'hover:bg-indigo-700',
                    'md:py-4', 'md:text-lg', 'md:px-10',
                    'tags',
                  ].join(' ')}
                >
                  {tag}
                </p>
              ))
            }
          </div>
        </div>

        <div>
          <p className={[
            'w-full',
            'flex', 'items-center', 'justify-center',
            'px-8', 'py-3',
            'border', 'border-transparent',
            'text-base', 'font-medium', 'text-white',
            'rounded-md',
            'bg-indigo-600', 'hover:bg-indigo-700',
            'md:py-4', 'md:text-lg', 'md:px-10',
          ].join(' ')}
          >
            フォントを見る
          </p>
        </div>

        <div className="posts-container">
          {
            posts.filter((post) => post.user.id === currentUser.id)
              .map((post) => (
                <div
                  key={post.id}
                  className="ml-3 inline-flex rounded-md box-container"
                >
                  <div className={[
                    'items-center', 'justify-center',
                    'px-5', 'py-3',
                    'border', 'border-transparent',
                    'text-base', 'font-medium',
                    'rounded-md',
                    'text-indigo-600', 'hover:bg-indigo-50i',
                    'post-card',
                  ].join(' ')}
                  >
                    <p className="text-lg name-tag">{post.user.name}</p>
                    <p className="px-5 py-3">{post.text}</p>
                  </div>
                </div>
              ))
          }
        </div>
      </div>
    </>
  );
};
export default Profile;
