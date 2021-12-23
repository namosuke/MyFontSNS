/* eslint-disable max-len */
import React, { useState } from "react";
import PostCanvas from "../components/postCanvas";

const Createpost = () => {
  const [textarea, setTextarea] = useState("");
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
        className="w-max h-max bg-yellow-600 rounded-full text-[#fff]"
      >
        投稿
      </button>
    </>
  );
};

export default Createpost;
