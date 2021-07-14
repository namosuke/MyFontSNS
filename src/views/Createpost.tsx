import React, { useState } from 'react';
import { useFont } from '../util/fetch';

const Createpost = () => {
  const font = useFont();
  console.log(font);
  const [textarea, setTextarea] = useState('');
  for (let i = 0; i < textarea.length; i += 1) {
    console.log(font?.data[textarea[i]]);
  }
  return (
    <>
      <textarea value={textarea} onChange={(e) => setTextarea(e.target.value)} className="m-4 text-base p-1 border border-gray-400 w-80" />
    </>
  );
};
export default Createpost;
