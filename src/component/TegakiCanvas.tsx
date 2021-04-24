/* eslint-disable max-len */
import React, { useEffect, useRef } from 'react';

const TegakiCanvas = (props: any) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    canvas.width = 400;
    canvas.height = 400;

    const canvasPixelTimes = canvas.width / canvas.clientWidth;
    const ctx = canvas.getContext('2d')!;
    const cellX = 32;
    const cellY = 32;
    const cellArr = Array.from(new Array(cellY), () => new Array(cellX).fill(0));
    const paperMarginLeft = 8;
    const paperMarginTop = 8;
    const paperWidth = 384; // 32の倍数でないと隙間ができる
    const paperHeight = 384;
    ctx.fillStyle = 'black';
    ctx.strokeRect(paperMarginLeft + 0.5, paperMarginTop + 0.5, paperWidth, paperHeight);
    let isDrawing = false;
    const addCellPt = (mouseX: number, mouseY: number) => {
      cellArr[Math.floor(((mouseY - paperMarginTop) * cellY) / paperHeight)][Math.floor(((mouseX - paperMarginLeft) * cellX) / paperWidth)] = 1;
    };

    const draw = () => {
      for (let y = 0; y < cellY; y += 1) {
        for (let x = 0; x < cellX; x += 1) {
          if (cellArr[y][x]) {
            ctx.fillRect(
              paperMarginLeft + Math.floor((paperWidth / cellX) * x),
              paperMarginTop + Math.floor((paperHeight / cellY) * y),
              Math.floor(paperWidth / cellX),
              Math.floor(paperHeight / cellY),
            );
          }
        }
      }
    };

    let lastMouseX: number;
    let lastMouseY: number;

    canvas.addEventListener('mousedown', (e) => {
      const mouseX = e.offsetX * canvasPixelTimes;
      const mouseY = e.offsetY * canvasPixelTimes;
      if (mouseX >= paperMarginLeft + paperWidth || mouseX < paperMarginLeft || mouseY >= paperMarginTop + paperHeight || mouseY < paperMarginTop) {
        return;
      }
      isDrawing = true;
      addCellPt(mouseX, mouseY);
      draw();
      lastMouseX = mouseX;
      lastMouseY = mouseY;
    });
    canvas.addEventListener('mousemove', (e) => {
      const mouseX = e.offsetX * canvasPixelTimes;
      const mouseY = e.offsetY * canvasPixelTimes;
      if (isDrawing === false
        || mouseX >= paperMarginLeft + paperWidth
        || mouseX < paperMarginLeft
        || mouseY >= paperMarginTop + paperHeight
        || mouseY < paperMarginTop) {
        return;
      }
      // マウス高速時の隙間を埋めます
      const diffX = mouseX - lastMouseX;
      const diffY = mouseY - lastMouseY;
      const loopTimes = Math.ceil(Math.max(Math.abs(diffX), Math.abs(diffY)) / (paperWidth / cellX)); // セル正方形想定
      for (let i = 0; i < loopTimes; i += 1) {
        addCellPt(lastMouseX + (diffX / loopTimes) * i, lastMouseY + (diffY / loopTimes) * i);
      }
      draw();
      lastMouseX = mouseX;
      lastMouseY = mouseY;
    });
    window.addEventListener('mouseup', () => {
      isDrawing = false;
    });
  });

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <canvas ref={canvasRef} {...props} />;
};

export default TegakiCanvas;
