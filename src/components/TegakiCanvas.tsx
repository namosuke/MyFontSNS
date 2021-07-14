/* eslint-disable max-len */
import React, { useEffect, useRef, useState } from 'react';

type FontData = number[][];

interface Position {
  x: number;
  y: number;
}

export interface TegakiCanvasProps {
  canvasMap: FontData;
  setCanvasMap: any;
  resetted: number;
}

const TegakiCanvas = ({ canvasMap, setCanvasMap, resetted }: TegakiCanvasProps) => {
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
      setCanvasMap(cells);
    });
  }, [resetted]);

  return <canvas ref={canvasRef} className="bg-white absolute w-full h-full" />;
};

export interface TegakiProps {
  char: string;
}

const Tegaki = ({ char = '' }: TegakiProps) => {
  const [font, setFont] = useState({});
  const [inputChar, setInputChar] = useState(char);

  const updateFont = (keyChar: string, value: FontData): void => {
    setFont((prevFont: { [key: string]: FontData }) => {
      const updatedFont = { ...prevFont };
      updatedFont[keyChar] = value;
      console.log(updatedFont);
      return updatedFont;
    });
  };

  const initCanvasMap: FontData = Array(32).fill(0).map(() => Array(32).fill(0));

  const [canvasMap, setCanvasMap] = useState(initCanvasMap);
  const [resetCanvasTime, setResetCanvasTime] = useState(Date.now());

  const downloadJson = () => {
    const fontJson: any = {};
    fontJson.formatVersion = '0.0.0';
    fontJson.data = { ...font };
    fontJson.color = 'black';
    fontJson.defaultWidth = 32;
    fontJson.defaultHeight = 32;
    fontJson.charCount = Object.keys(font).length;
    // https://www.aruse.net/entry/2019/11/02/095636
    const fileName = 'mfsFont.json';
    const data = new Blob([JSON.stringify(fontJson)], { type: 'text/json' });
    const jsonURL = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.href = jsonURL;
    link.setAttribute('download', fileName);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="relative overflow-hidden" style={{ width: '300px', height: '300px' }}>
        <TegakiCanvas canvasMap={canvasMap} setCanvasMap={setCanvasMap} resetted={resetCanvasTime} />
        <div className="tegaki-model absolute w-full h-full text-center pointer-events-none">{inputChar}</div>
      </div>
      <div>
        <input type="text" className="m-4 text-base p-1 border border-gray-400" value={inputChar} onChange={(e) => { setInputChar(e.target.value); }} />
      </div>
      <button type="button" className="bg-yellow-600 text-white w-20 h-8 rounded-full m-4" onClick={() => { updateFont(inputChar, canvasMap); setCanvasMap(initCanvasMap); setResetCanvasTime(Date.now()); }}>保存</button>
      <button type="button" className="bg-yellow-600 text-white w-20 h-8 rounded-full m-4" onClick={() => { setCanvasMap(initCanvasMap); setResetCanvasTime(Date.now()); }}>全消し</button>
      <button type="button" className="bg-yellow-600 text-white px-2 h-8 rounded-full m-4" onClick={() => { downloadJson(); }}>ダウンロード</button>
    </div>
  );
};

export default Tegaki;
