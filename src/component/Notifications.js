import React, { useEffect, useState } from 'react';

const Notifications = () => {
    useEffect(() => {
        new TegakiCanvas();
    });
    return (<>
        <div className="relative" style={{ width: "400px", height: "400px" }}>
            <canvas id="tegaki-canvas" className="bg-white absolute"></canvas>
            <div className="tegaki-model absolute w-full h-full">慶</div>
        </div>
    </>);
}

class TegakiCanvas {
    constructor() {
        this.canvas = document.querySelector('#tegaki-canvas');
        this.canvas.width = 400;
        this.canvas.height = 400;
        this.canvasPixelTimes = this.canvas.width / this.canvas.clientWidth;
        this.ctx = this.canvas.getContext('2d');
        this.cellX = 32;
        this.cellY = 32;
        this.cellArr = Array.from(new Array(this.cellY), () => new Array(this.cellX).fill(0));
        this.paperMarginLeft = 8;
        this.paperMarginTop = 8;
        this.paperWidth = 384;  // 32の倍数でないと隙間ができる
        this.paperHeight = 384;
        this.ctx.fillStyle = 'black';
        this.ctx.strokeRect(this.paperMarginLeft + 0.5, this.paperMarginTop + 0.5, this.paperWidth, this.paperHeight);
        this.isDrawing = false;
        this.addCellPt = (mouseX, mouseY) => {
            this.cellArr[Math.floor((mouseY - this.paperMarginTop) * this.cellY / this.paperHeight)][Math.floor((mouseX - this.paperMarginLeft) * this.cellX / this.paperWidth)] = 1;
        }
        this.canvas.addEventListener('mousedown', e => {
            this.mouseX = e.offsetX * this.canvasPixelTimes;
            this.mouseY = e.offsetY * this.canvasPixelTimes;
            if (this.mouseX >= this.paperMarginLeft + this.paperWidth || this.mouseX < this.paperMarginLeft || this.mouseY >= this.paperMarginTop + this.paperHeight || this.mouseY < this.paperMarginTop) {
                return;
            }
            this.isDrawing = true;
            this.addCellPt(this.mouseX, this.mouseY);
            this.draw();
            this.lastMouseX = this.mouseX;
            this.lastMouseY = this.mouseY;
        });
        this.canvas.addEventListener('mousemove', e => {
            this.mouseX = e.offsetX * this.canvasPixelTimes;
            this.mouseY = e.offsetY * this.canvasPixelTimes;
            if (this.isDrawing === false || this.mouseX >= this.paperMarginLeft + this.paperWidth || this.mouseX < this.paperMarginLeft || this.mouseY >= this.paperMarginTop + this.paperHeight || this.mouseY < this.paperMarginTop) {
                return;
            }
            // マウス高速時の隙間を埋めます
            let diffX = this.mouseX - this.lastMouseX;
            let diffY = this.mouseY - this.lastMouseY;
            let loopTimes = Math.ceil(Math.max(Math.abs(diffX), Math.abs(diffY)) / (this.paperWidth / this.cellX));  // セル正方形想定
            for (let i = 0; i < loopTimes; i++) {
                this.addCellPt(this.lastMouseX + (diffX / loopTimes) * i, this.lastMouseY + (diffY / loopTimes) * i);
            }
            this.draw();
            this.lastMouseX = this.mouseX;
            this.lastMouseY = this.mouseY;
        });
        window.addEventListener('mouseup', () => {
            this.isDrawing = false;
        });
    }
    draw() {
        for (let y = 0; y < this.cellY; y++) {
            for (let x = 0; x < this.cellX; x++) {
                if (this.cellArr[y][x]) {
                    this.ctx.fillRect(this.paperMarginLeft + Math.floor((this.paperWidth / this.cellX) * x), this.paperMarginTop + Math.floor((this.paperHeight / this.cellY) * y), Math.floor(this.paperWidth / this.cellX), Math.floor(this.paperHeight / this.cellY));
                }
            }
        }
    }
}
export default Notifications;