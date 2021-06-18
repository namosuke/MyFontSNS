import React from 'react';
import { Link } from 'react-router-dom';

import homeIcon from '../assets/home.svg';
import bellIcon from '../assets/bell.svg';
import profileIcon from '../assets/profile.svg';
import messageIcon from '../assets/message.svg';

const Footer = () => (
  <div className="footer">
    <Link to="/">
      <svg>
        <use xlinkHref={`${homeIcon}#_x32_`} />
      </svg>
    </Link>
    <Link to="/notifications">
      <svg>
        <use xlinkHref={`${bellIcon}#_x32_`} />
      </svg>
    </Link>
    <Link to="/messages">
      <svg>
        <use xlinkHref={`${messageIcon}#_x32_`} />
      </svg>
    </Link>
    <Link to="/profile">
      <svg>
        <use xlinkHref={`${profileIcon}#_x32_`} />
      </svg>
    </Link>
  </div>
);
export default Footer;
