import { GridBox } from './grid-box';
import { Constants } from './constants';

export class GameArea {
    name: string;
    type: string;
    boxes: GridBox[];
    dangerArea = false;

    constructor(name: string, type: string, boxes: GridBox[]) {
        this.name = name;
        this.type = type;
        this.boxes = boxes;
    }

    addBox(box: GridBox) {
        box.type = this.type;
        box.drawDelay = this.boxes.length * Constants.boxDrawDelay;
        box.parentArea = this;
        this.boxes.push(box);
    }

    clear() {
        for (const box of this.boxes) {
            box.reset();
        }
    }

    getSize() {
        return this.boxes.length;
    }

    isRelated(box: GridBox) {
        return box && box.type === this.type;
    }

    checkIfEnemy() {
        for (const box of this.boxes) {
            if (box.isEnemy) {
                this.dangerArea = true;
                break;
            }
        }

        if (this.dangerArea) {
            for (const box of this.boxes) {
                box.isEnemy = true;
            }
        }
    }
}
