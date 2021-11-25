/* eslint-disable react/button-has-type */
/* eslint-disable new-cap */
/* eslint-disable no-new */
/* eslint-disable no-param-reassign */
// https://nimil.jp/blog/p5js-react
import p5 from "p5";
import React, { useEffect, useRef } from "react";
import axios from "axios";

const PostCanvas = ({ text }: { text: string }) => {
  const postCanvasText = useRef(text);
  const p5Ref = useRef<null | p5>(null);
  const postCanvasElement = useRef<HTMLDivElement>(null);
  postCanvasText.current = text;
  if (p5Ref.current) {
    p5Ref.current.redraw();
  }

  const sketch = async (p: p5) => {
    const { data: fontFile } = await axios.get("./seeds/mfsFont.json");
    const scaling = 0.5;

    p.setup = () => {
      if (postCanvasElement.current) {
        // Ctrl + F5じゃないと反映しません
        p.createCanvas(postCanvasElement.current.clientWidth, 200);
      }
      p.noLoop();
      p5Ref.current = p;
    };

    p.draw = () => {
      p.clear();
      p.scale(scaling);

      const spreadPostCanvasText = postCanvasText.current.split("");
      const currentBasePosition = { x: 0, y: 0 };
      spreadPostCanvasText.forEach((char) => {
        if (char in fontFile?.data) {
          const height = fontFile.data[char].length;
          const width = fontFile.data[char][0].length;
          if (currentBasePosition.x + width > p.width / scaling) {
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
          if (currentBasePosition.x + p.textWidth(char) > p.width / scaling) {
            currentBasePosition.y += fontFile.defaultHeight + 20;
            currentBasePosition.x = 0;
          }
          p.textSize(fontFile.defaultHeight);
          p.text(
            char,
            currentBasePosition.x,
            currentBasePosition.y + fontFile.defaultHeight - 5
          );
          currentBasePosition.x += p.textWidth(char);
        }
      });
    };
  };

  useEffect(() => {
    new p5(sketch, postCanvasElement.current ?? undefined);
  }, []);

  return <div ref={postCanvasElement} />;
};

export default PostCanvas;
