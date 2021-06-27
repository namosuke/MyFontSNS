/* eslint-disable max-len */
import React, { useEffect, useRef } from 'react';

interface Position {
  x: number;
  y: number;
}

const TegakiCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cellSize = 12;
    const [rowCellCount, colCellCount] = [32, 32];
    const cells = Array(rowCellCount).fill(0).map(() => Array(colCellCount).fill(0));

    const canvas = canvasRef.current!;

    // cellSize の倍数でないと隙間ができる
    canvas.width = rowCellCount * cellSize;
    canvas.height = colCellCount * cellSize;

    const ctx = canvas.getContext('2d')!;

    // TODO: do we need canvas.height / canvas.clientHeight?
    const canvasPixelTimes = canvas.width / canvas.clientWidth;
    let previousMousePos: Position | null = null;

    const isMouseInPaper = (mousePos: Position) => (
      mousePos.x < 0 || mousePos.x >= canvas.width
      || mousePos.y < 0 || mousePos.y >= canvas.height
    );

    const addCell = (mousePos: Position) => {
      const rowIdx = Math.floor(mousePos.y / cellSize);
      const colIdx = Math.floor(mousePos.x / cellSize);

      cells[rowIdx][colIdx] = 1;
    };

    // マウス高速時の隙間を埋めます
    const interpolateCells = (e: MouseEvent) => {
      // TODO: better variable name
      const diffX = e.movementX;
      const diffY = e.movementY;
      const maxDiff = Math.max(Math.abs(diffX), Math.abs(diffY));
      const loopTimes = Math.ceil(maxDiff / cellSize);

      Array(loopTimes).fill(loopTimes).map((num, idx) => ({
        // TODO: find a way to remove non-null-assertion-operator here
        x: previousMousePos!.x + (diffX / num) * idx,
        y: previousMousePos!.y + (diffY / num) * idx,
      })).forEach(addCell);
    };

    const renderCells = () => {
      cells.forEach((row, rowIdx) => {
        row.forEach((col, colIdx) => {
          if (col) {
            ctx.fillRect(cellSize * colIdx, cellSize * rowIdx, cellSize, cellSize);
          }
        });
      });
    };

    const draw = (e: MouseEvent) => {
      // TODO: MouseEvent.offsetX & MouseEvent.offsetY are experimental technology
      // Find an alternative way to implement it.
      const currentMousePos = {
        x: e.offsetX * canvasPixelTimes,
        y: e.offsetY * canvasPixelTimes,
      };

      if (isMouseInPaper(currentMousePos)) return;

      addCell(currentMousePos);
      interpolateCells(e);
      renderCells();

      previousMousePos = {
        x: currentMousePos.x,
        y: currentMousePos.y,
      };
    };

    canvas.addEventListener('mousedown', (e) => {
      draw(e);
      canvas.addEventListener('mousemove', draw);
    });

    window.addEventListener('mouseup', () => {
      canvas.removeEventListener('mousemove', draw);
    });
  }, []);

  console.log();

  const s = {
    // TODO: remove magic number 8px (margin = outline)
    margin: '8px',
    outline: 'white solid 8px',
    border: '2px solid black',
    // TODO: check if calc(100% - 16px) works
    // TODO: remove magic number 16px (16px = margin * 2)
    width: 'calc(100% - 16px)',
    height: 'calc(100% - 16px)',
  };

  return <canvas ref={canvasRef} style={s} className="bg-white absolute" />;
};

export interface TegakiProps {
  char: string;
}

const Tegaki = ({ char = '' }: TegakiProps) => (
  <div className="relative" style={{ width: '400px', height: '400px' }}>
    <TegakiCanvas />
    <div className="tegaki-model absolute w-full h-full">{char}</div>
  </div>
);

export default Tegaki;
