import React from 'react';

import TegakiCanvas from '../components/TegakiCanvas';

const Notifications = () => (
  <>
    <div className="relative" style={{ width: '400px', height: '400px' }}>
      <TegakiCanvas className="bg-white absolute" />
      <div className="tegaki-model absolute w-full h-full">慶</div>
    </div>
  </>
);

export default Notifications;
