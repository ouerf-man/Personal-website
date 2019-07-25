// Lissajous Electrons
// A PEN BY Jason Strutz
/*****************************/
/*            CODE PEN       */
/*****************************/

var Painter = function(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.electrons = [];
    this.electronTailColors = [];
    this.electronHeadFillColors = [];
    this.electronHeadStrokeColors = [];
    this.centerX = 250;
    this.centerY = 250;
    this.scaleX = 100;
    this.scaleY = 100;
}
Painter.prototype.start = function() {
    this.requestRender();
}
Painter.prototype.render = function() {
    this.ctx.clearRect(0,0,500,500);
    var t = window.performance.now();

    // Tail
    this.ctx.strokeWidth = 0;
    for (var idx in this.electrons) {
        var electron = this.electrons[idx];

        this.ctx.fillStyle = this.electronTailColors[idx];
        for (var i = electron.tailSteps; i>0; i--) {
            this.ctx.beginPath();
            this.ctx.arc(
                this.centerX + this.scaleX * this.electrons[idx].x(t-i*electron.tailLength),
                this.centerY + this.scaleY * this.electrons[idx].y(t-i*electron.tailLength),
                6*(electron.tailSteps-i)/electron.tailSteps, 0, Math.PI*2);
            this.ctx.closePath();
            this.ctx.fill();
        };

        // Head
        this.ctx.strokeWidth = 1;
        for (var idx in this.electrons) {
            this.ctx.fillStyle = this.electronHeadFillColors[idx];
            this.ctx.strokeStyle = this.electronHeadStrokeColors[idx];
            this.ctx.beginPath();
            this.ctx.arc(
                this.centerX + this.scaleX * this.electrons[idx].x(t),
                this.centerY + this.scaleY * this.electrons[idx].y(t),
                6, 0, Math.PI*2);
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.stroke();
        }

    }

    this.requestRender();
}
Painter.prototype.requestRender = function() {
    window.requestAnimationFrame(this.render.bind(this));
}
Painter.prototype.addElectron = function(electron) {
    this.electrons.push(electron);
    this.electronTailColors.push(this._rgba(electron.color, 20.0/electron.tailSteps));
    this.electronHeadFillColors.push(this._rgba([0,0,0], 1.0));
    this.electronHeadStrokeColors.push(this._rgba(electron.color, 1.0));
}
Painter.prototype._rgba = function(c,a) {
    return "rgba("+ c[0] + "," + c[1] + "," + c[2] + "," + a + ")";
}

var Electron = function(color, fx, fy, tailSteps, tailLength) {
    this.color = color;
    this.x = fx;
    this.y = fy;
    this.tailSteps = tailSteps;
    this.tailLength = tailLength;
}

function makeLissajous(speed,xProd,yProd,xDelta,yDelta) {
    return {
        x: function(t) { return Math.sin(xProd*t*speed+xDelta); },
        y: function(t) { return Math.sin(yProd*t*speed+yDelta); }
    };
}

var LissajousElectron = function(color, xProd, yProd, xDelta, yDelta, tailSteps, tailLength) {
    var lissa = makeLissajous(1/1000,xProd,yProd,xDelta,yDelta);
    return new Electron(color, lissa.x, lissa.y, 200, 4);
}

window.addEventListener('load', function(e) {
    var painter = new Painter(document.getElementById('lissajous-canvas'));
    painter.addElectron(new LissajousElectron([58,252,236], 3, 1, 1, 0, 100, 4));
    painter.addElectron(new LissajousElectron([211,12,123], 5, 2, 0, -2, 100, 4));
    painter.addElectron(new LissajousElectron([83,89,154], 2, 3, 0, 0.4, 100, 4));
    painter.start();
});
