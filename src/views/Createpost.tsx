/* eslint-disable max-len */
import React, { useState } from "react";
import { useFont } from "../util/fetch";
import PostCanvas from "../components/postCanvas";

/* const Createpost = () => {
  const font = useFont();
  console.log(font);
  const [textarea, setTextarea] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current!;
  if (font) {
    for (let i = 0; i < textarea.length; i += 1) {
      console.log(font.data[textarea[i]]);
    }
  }
  return (
    <>
      <textarea value={textarea} onChange={(e) => setTextarea(e.target.value)} className="m-4 text-base p-1 border border-gray-400 w-80" />
      <canvas ref={canvasRef} className="w-full h-full" />
    </>
  );
};
*/

const Createpost = () => {
  const [textarea, setTextarea] = useState("");
  /* const font = useFont();
  if (font) {
    for (let i = 0; i < textarea.length; i += 1) {
      console.log(font.data[textarea[i]]);
    }
  } */
  return (
    <>
      <textarea
        value={textarea}
        onChange={(e) => setTextarea(e.target.value)}
        className="m-4 text-base p-1 border border-gray-400 w-80"
      />
      <PostCanvas text={textarea} />
    </>
  );
};

export default Createpost;
