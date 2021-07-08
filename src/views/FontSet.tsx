import React, { useState } from 'react';

import Tegaki from '../components/TegakiCanvas';

const FontSet = () => {
  const [font, setFont] = useState({});

  const handleFont = (char: string, value: string): void => {
    console.log(char, value);
    setFont({ a: 'b' });
  };
  console.log(font);
  return (
    <Tegaki char="慶" func={handleFont} />
  );
};

export default FontSet;
