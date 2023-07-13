import React, { useState } from "react";

function LikeButton() {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  };
  return (
    <span
      className="likeButton"
      onClick={handleClick}
      onKeyDown={handleClick}
      role="button"
      tabIndex={0}
    >
      ♥{count}
    </span>
  );
}

export default LikeButton;
