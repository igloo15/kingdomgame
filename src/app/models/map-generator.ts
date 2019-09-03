import { Constants } from './constants';
import { Map } from './map';
import { GameUtil } from './utility';
import { GameArea } from './area';

export class MapGenerator {

    public static generateAllWater(map: Map) {
        const distanceInlandColumnWater = Math.ceil(map.numberOfColumns * 0.2);
        const distanceInlandRowWater = Math.ceil(map.numberOfRows * 0.2);
        const waterFactor = 1;

        MapGenerator.generateWater(map, -map.numberOfRows / Constants.waterFactor, map.numberOfRows,
            distanceInlandColumnWater, 0);
        MapGenerator.generateWater(map, -map.numberOfRows / Constants.waterFactor, map.numberOfRows,
            map.numberOfColumns - distanceInlandColumnWater, map.numberOfColumns);
        MapGenerator.generateWater(map, -map.numberOfColumns / Constants.waterFactor, map.numberOfColumns,
            distanceInlandRowWater, 0, true);
        MapGenerator.generateWater(map, -map.numberOfColumns / Constants.waterFactor, map.numberOfColumns,
            map.numberOfRows - distanceInlandRowWater, map.numberOfRows, true);
    }

    public static generateWater(map: Map,
                                startItem1: number,
                                endItem1: number,
                                startItem2: number,
                                endItem2: number,
                                swap: boolean = false) {

        const startPointY = GameUtil.getRandomInt(startItem1, endItem1);
        const expansionGrowth = 4;
        const expansionShrinkage = 2;

        if (startPointY >= 0) {
            const newWaterArea = new GameArea('ocean', Constants.waterType, []);
            let currentExpansion = 0;
            const distanceAmount = Math.abs(endItem2 - startItem2) + 1;
            for (let j = 0; j < distanceAmount; j++) {
                let xPoint = 0;
                if (endItem2 > startItem2) {
                    xPoint = startItem2 + j;
                } else {
                    xPoint = startItem2 - j;
                }
                const expand = GameUtil.getRandomInt(0, 4);
                let expansionAmount = 0;
                if (expand % 2 === 0) {
                    if (currentExpansion === 0) {
                        expansionAmount = Math.floor(GameUtil.getRandomInt(0, endItem1) / 2);
                    } else {
                        expansionAmount = Math.floor(GameUtil.getRandomInt(0, expansionGrowth));
                    }
                } else {
                    if (currentExpansion === 0) {
                        expansionAmount = 0;
                    } else {
                        expansionAmount = -Math.floor(GameUtil.getRandomInt(0, expansionShrinkage));
                    }
                }

                let newExpansion = currentExpansion + expansionAmount;
                if (newExpansion < 0) {
                    newExpansion = 0;
                }

                currentExpansion = newExpansion;
                for (let i = 0; i < ((currentExpansion * 2) + 1); i++) {
                    let boxX = xPoint;
                    let boxY = startPointY - currentExpansion + i;
                    if (swap) {
                        boxX = startPointY - currentExpansion + i;
                        boxY = xPoint;
                    }
                    const box = map.getBox(boxX, boxY);
                    if (GameUtil.isBlankBox(box)) {
                        newWaterArea.addBox(box);
                    }
                }
            }

            if (newWaterArea.getSize() > 0) {
                map.areas.push(newWaterArea);
            }
        }
    }

    public static generateAllAreas(map: Map) {
        for (let i = 0; i < Constants.areaPasses; i++) {
            MapGenerator.generateArea(map);
        }

        MapGenerator.cleanUpAreas(map);

        map.areas.forEach(a => a.checkIfEnemy());
    }

    public static generateArea(map: Map) {
        const xPoint = GameUtil.getRandomInt(0, map.numberOfColumns);
        const yPoint = GameUtil.getRandomInt(0, map.numberOfRows);

        const startBox = map.getBox(xPoint, yPoint);

        if (GameUtil.isBlankBox(startBox)) {
            const myType = `New Area ${map.areas.length}`;
            const newArea = new GameArea(myType, myType, []);
            newArea.addBox(startBox);
            for (let i = 0; i < Constants.areaGrowPasses; i++) {
                const newXPoint = GameUtil.getRandomInt(0, map.numberOfColumns);
                const newYPoint = GameUtil.getRandomInt(0, map.numberOfRows);
                const newBox = map.getBox(newXPoint, newYPoint);
                if (GameUtil.isBlankBox(newBox)) {
                    const attachedBoxes = map.getAttachedBoxes(newBox);
                    for (const otherBox of attachedBoxes) {
                        if (newArea.isRelated(otherBox.box)) {
                            newArea.addBox(newBox);
                            break;
                        }
                    }
                }
                if (newArea.getSize() > Constants.areaMaxSize) {
                    break;
                }
            }

            for (const box of map.boxes) {
                if (GameUtil.isBlankBox(box)) {
                    const sideBoxes = map.getAttachedBoxes(box);
                    let surrounded = true;
                    for (const sideBox of sideBoxes) {
                        if (sideBox.box && sideBox.box.type !== myType && sideBox.box.type !== Constants.waterType) {
                            surrounded = false;
                            break;
                        }
                    }
                    if (surrounded) {
                        newArea.addBox(box);
                    }
                }
            }

            if (newArea.getSize() < Constants.areaMinSize) {
                newArea.clear();
            } else {
                map.areas.push(newArea);
            }
        }
    }

    public static cleanUpAreas(map: Map) {
        for (const box of map.boxes) {
            if (GameUtil.isBlankBox(box)) {
                const sideBoxes = map.getAttachedBoxes(box);
                const types: GameArea[] = [];
                for (const sideBox of sideBoxes) {
                    if (sideBox.box && !GameUtil.isBlankBox(sideBox.box) && sideBox.box.type !== Constants.waterType) {
                        types.push(sideBox.box.parentArea);
                    }
                }
                if (types.length > 0) {
                    const typeNum = GameUtil.getRandomInt(0, types.length);
                    types[typeNum].addBox(box);
                } else {
                    map.badlands.addBox(box);
                }
            }
        }
    }

    public static generateBorders(map: Map) {
        const borders: number[][][] = [];
        for (const box of map.boxes) {
            const skip = (box.x + box.y) % 2 === 0;
            if (!skip) {
                continue;
            }
            const otherBoxes = map.getAttachedBoxes(box);
            for (const otherBox of otherBoxes) {
                if (otherBox.box && otherBox.box.type !== box.type) {
                    switch (otherBox.direction) {
                        case Constants.West:
                            borders.push([[box.actualX, box.actualY], [box.actualX + map.gridSize, box.actualY]]);
                            break;
                        case Constants.South:
                            borders.push([[box.actualX + map.gridSize, box.actualY],
                                [box.actualX + map.gridSize, box.actualY + map.gridSize]]);
                            break;
                        case Constants.East:
                            borders.push([[box.actualX, box.actualY + map.gridSize],
                                [box.actualX + map.gridSize, box.actualY + map.gridSize]]);
                            break;
                        case Constants.North:
                            borders.push([[box.actualX, box.actualY],
                                [box.actualX, box.actualY + map.gridSize]]);
                            break;
                    }
                }
            }
        }

        return borders;
    }

}
