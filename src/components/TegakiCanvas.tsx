/* eslint-disable max-len */
import React, { useEffect, useRef, useState } from 'react';

interface Position {
  x: number;
  y: number;
}

export interface TegakiCanvasProps {
  canvasMap: number[][];
  setCanvasMap: any;
}

const TegakiCanvas = ({ canvasMap, setCanvasMap }: TegakiCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cellSize = 12;
    const [rowCellCount, colCellCount] = [32, 32];
    const cells = canvasMap;

    const canvas = canvasRef.current!;

    // cellSize の倍数でないと隙間ができる
    canvas.width = rowCellCount * cellSize;
    canvas.height = colCellCount * cellSize;

    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

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
      setCanvasMap(cells);
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
      ctx.clearRect(0, 0, canvas.width, canvas.height);
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

  return <canvas ref={canvasRef} className="bg-white absolute w-full h-full" />;
};

export interface TegakiProps {
  char: string;
}

const Tegaki = ({ char = '' }: TegakiProps) => {
  const [font, setFont] = useState({});

  const updateFont = (keyChar: string, value: number[][]): void => {
    setFont((prevFont: { [key: string]: any }) => {
      const updatedFont = { ...prevFont };
      updatedFont[keyChar] = value;
      return updatedFont;
    });
  };
  console.log(font);

  const initCanvasMap = Array(32).fill(0).map(() => Array(32).fill(0));

  const [canvasMap, setCanvasMap]: [number[][], any] = useState(initCanvasMap);
  const [resetCanvasTime, setResetCanvasTime]: [number, any] = useState(Date.now());
  console.log(canvasMap);

  return (
    <div>
      <div className="relative overflow-hidden" style={{ width: '300px', height: '300px' }}>
        <TegakiCanvas canvasMap={canvasMap} setCanvasMap={setCanvasMap} key={resetCanvasTime} />
        <div className="tegaki-model absolute w-full h-full text-center pointer-events-none">{char}</div>
      </div>
      <button type="button" className="bg-yellow-600 text-white w-20 h-8 rounded-full m-4" onClick={() => { updateFont(char, canvasMap); }}>保存</button>
      <button type="button" className="bg-yellow-600 text-white w-20 h-8 rounded-full m-4" onClick={() => { setCanvasMap(initCanvasMap); setResetCanvasTime(Date.now()); }}>全消し</button>
    </div>
  );
};

export default Tegaki;
