import { GameArea } from './area';
import { Constants } from './constants';

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
    public isEnemy: boolean;

    constructor(x: number, y: number, gridSize: number, isEnemy) {
        this.isEnemy = isEnemy;
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

    getColor() {
        switch (this.type) {
            case Constants.waterType:
                return 'blue';
            case Constants.blankType:
                return 'teal';
            case Constants.badlandType:
                return '#581845';
            default:
                if (this.isEnemy) {
                    return '#FA5C5C';
                } else {
                    return 'white';
                }
        }
    }
}
