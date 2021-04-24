import React, { useEffect, useState } from 'react';
import axios from 'axios';
import loadIcon from '../img/loading.svg';

const Timeline = () => {
  const [data, setData] = useState<any | undefined>();
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('./timeline.json');
      console.log(response.data);
      setData(response.data);
    };
    getData();
  }, []);
  if (!data) return <img src={loadIcon} className="load-icon" alt="読込中" />;
  return (
    <>
      {data.posts.map((item: any) => (
        <div className="ml-3 inline-flex rounded-md box-container">
          <div className={`
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
                         `}
          >
            <p className={`
                          text-lg
                          name-tag`}
            >
              {item.user.name}
            </p>
            <p className={`
                         px-5
                         py-3`}
            >
              {item.text}
            </p>
            <div className="post-bottom" />
          </div>
        </div>

        // <li key={item.id}>{item.text}</li>
      ))}
    </>
  );
};

export default Timeline;
