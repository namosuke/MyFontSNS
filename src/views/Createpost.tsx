/* eslint-disable max-len */
import React, { useState } from "react";
import PostCanvas from "../components/postCanvas";
import { useFont } from "../util/fetch";

const Createpost = () => {
  const [textarea, setTextarea] = useState("");
  const font = useFont();
  const post = () => {
    if (font) {
      const postData = {
        text: textarea,
        textArray: Array.from(textarea),
        formatVersion: "0.0.0",
        textCount: 0,
        widths: [],
        heights: [],
        font: "mfsFont",
        data: [],
      };
      console.log(postData);
    }
  };
  return (
    <>
      <textarea
        value={textarea}
        onChange={(e) => setTextarea(e.target.value)}
        className="m-4 text-base p-1 border border-gray-400 w-80"
      />
      <PostCanvas text={textarea} />
      <button
        type="button"
        className="w-max h-max bg-yellow-600 rounded-full text-white px-[10px] ml-[10px]"
        onClick={post}
      >
        投稿
      </button>
    </>
  );
};

export default Createpost;
