
export class GridBox {
    public x: number;
    public y: number;
    public actualX: number;
    public actualY: number;

    constructor(x: number, y: number, gridSize: number) {
        this.x = x;
        this.actualX = (x * gridSize) + (gridSize / 2);
        this.y = y;
        this.actualY = (y * gridSize) + (gridSize / 2);
    }
}
