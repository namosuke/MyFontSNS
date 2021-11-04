/* eslint-disable react/button-has-type */
/* eslint-disable new-cap */
/* eslint-disable no-new */
/* eslint-disable no-param-reassign */
// https://nimil.jp/blog/p5js-react
import p5 from "p5";
import React, { useEffect } from "react";
import axios from "axios";

let postCanvasText: string;

const sketch = async (p: p5) => {
  const { data: fontFile } = await axios.get("./seeds/mfsFont.json");

  p.setup = () => {
    // Ctrl + F5じゃないと反映しません
    p.createCanvas(p.windowWidth, p.windowHeight).parent("post-canvas");
  };

  p.draw = () => {
    p.clear();
    const spreadPostCanvasText = postCanvasText.split("");
    const currentBasePosition = { x: 0, y: 0 };
    spreadPostCanvasText.forEach((char) => {
      if (char in fontFile?.data) {
        const height = fontFile.data[char].length;
        const width = fontFile.data[char][0].length;
        if (currentBasePosition.x + width > p.windowWidth) {
          currentBasePosition.y += fontFile.defaultHeight + 20;
          currentBasePosition.x = 0;
        }
        for (let h = 0; h < height; h += 1) {
          for (let w = 0; w < width; w += 1) {
            if (fontFile.data[char][h][w] === 1) {
              p.point(currentBasePosition.x + w, currentBasePosition.y + h);
            }
          }
        }
        currentBasePosition.x += width;
      } else if (char === "\n") {
        currentBasePosition.y += fontFile.defaultHeight + 20;
        currentBasePosition.x = 0;
      } else {
        console.log("data not found");
      }
    });
  };
};

const PostCanvas = ({ text }: { text: string }) => {
  postCanvasText = text;

  useEffect(() => {
    new p5(sketch);
  }, []);

  return <div id="post-canvas" />;
};

export default PostCanvas;
