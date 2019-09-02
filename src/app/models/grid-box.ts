import { GameArea } from './area';

export interface DirectionGridBox {
    direction: string;
    box: GridBox;
}

export class GridBox {
    public x: number;
    public y: number;
    public actualX: number;
    public actualY: number;
    public type = '';
    public drawDelay = 0;
    public parentArea: GameArea;

    constructor(x: number, y: number, gridSize: number) {
        this.x = x;
        this.actualX = (x * gridSize);
        this.y = y;
        this.actualY = (y * gridSize);
    }

    reset() {
        this.type = '';
        this.drawDelay = 0;
        this.parentArea = null;
    }

    getAttachedBoxes() {
        return [
            [this.x - 1, this.y],
            [this.x, this.y + 1],
            [this.x + 1, this.y],
            [this.x, this.y - 1]
        ];
    }
}
