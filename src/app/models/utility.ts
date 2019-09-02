import { GridBox } from './grid-box';
import { Constants } from './constants';

export class GameUtil {

    public static getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    public static isBlankBox(box: GridBox) {
        return box && box.type === Constants.blankType;
    }
}
