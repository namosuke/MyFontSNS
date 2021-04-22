import React from "react";

const Notifications = () => {
    useEffect(() => {
        new TegakiCanvas();
    });
    return <canvas id="tegaki-canvas" className="bg-white"></canvas>;
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
        this.paperRect = [10.5, 10.5, 380, 380];
        this.ctx.fillStyle = 'black';
        //this.ctx.strokeRect(...this.paperRect);


        this.canvas.addEventListener('mousedown', e => {
            this.mouseX = e.offsetX * this.canvasPixelTimes;
            this.mouseY = e.offsetY * this.canvasPixelTimes;
            this.cellArr[Math.floor(this.mouseY * 32 / 400)][Math.floor(this.mouseX * 32 / 400)] = 1;
            this.draw();
        });
    }

    draw() {
        for (let y = 0; y < this.cellY; y++) {
            for (let x = 0; x < this.cellX; x++) {
                if (this.cellArr[y][x]) {
                    this.ctx.fillRect(Math.floor((400 / 32) * x), Math.floor((400 / 32) * y), Math.floor(400 / 32), Math.floor(400 / 32));
                }
            }
        }
    }
}
export default Notifications;