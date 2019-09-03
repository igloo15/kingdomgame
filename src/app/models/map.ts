import * as d3 from 'd3';
import { GridBox, DirectionGridBox } from './grid-box';
import { Constants } from './constants';
import { MapGenerator } from './map-generator';
import { GameArea } from './area';
import { map } from 'd3';

export class Map {

    private parentElem: HTMLElement;
    private svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
    private gridGroup: d3.Selection<SVGGElement, unknown, null, undefined>;
    private borderGroup: d3.Selection<SVGGElement, unknown, null, undefined>;
    private lineFunction: d3.Line<[number, number]>;

    public numberOfRows: number;
    public numberOfColumns: number;
    public numOfAreas = 0;
    public pixelWidth;
    public pixelHeight;
    public gridSize = 10;
    public gridHalfSize = 5;
    public margin = 10;

    public boxes: GridBox[] = [];
    public borders: number[][][] = [];
    public areas: GameArea[] = [];

    public badlands = new GameArea('The BadLands', Constants.badlandType, []);

    constructor(gridSize: number) {
        if (gridSize) {
            this.gridSize = gridSize;
            this.gridHalfSize = this.gridSize / 2;
        }
    }

    public initialize(parent: HTMLElement) {
        this.parentElem = parent;
        this.updateDimensions();
        this.numberOfRows = Math.floor((this.pixelHeight - this.margin) / this.gridSize);
        this.numberOfColumns = Math.floor((this.pixelWidth - this.margin) / this.gridSize);
        const allRowSize = this.numberOfRows * this.gridSize;
        const allColumnSize = this.numberOfColumns * this.gridSize;
        const topMargin = (this.pixelHeight - allRowSize) / 2;
        const leftMargin = (this.pixelWidth - allColumnSize) / 2;

        for (let x = 0; x < this.numberOfColumns; x++) {
            for (let y = 0; y < this.numberOfRows; y++) {
                const isEnemy = x === 0 || y === 0 || x === this.numberOfColumns - 1 || y === this.numberOfRows - 1;
                this.boxes.push(new GridBox(x, y, this.gridSize, isEnemy));
            }
        }

        this.svg = d3.select(this.parentElem).append('svg')
            .attr('width', this.pixelWidth)
            .attr('height', this.pixelHeight);

        this.gridGroup = this.svg
            .append('g')
            .attr('transform', 'translate(' + leftMargin + ',' + topMargin + ')');

        this.borderGroup = this.svg
            .append('g')
            .attr('transform', 'translate(' + leftMargin + ',' + topMargin + ')');

        this.lineFunction = d3.line()
            .x((d) => d[0])
            .y((d) => d[1]);


        this.redraw();

        MapGenerator.generateAllWater(this);

        MapGenerator.generateAllAreas(this);

        this.borders = MapGenerator.generateBorders(this);
    }

    public clear() {
        this.boxes.forEach(b => {
            b.reset();
        });
        this.borders = [];
    }

    public redraw() {
        requestAnimationFrame(() => {
            this.redrawGrid();
            this.redrawBorders();
        });
    }

    public updateDimensions() {
        this.pixelHeight = this.parentElem.clientHeight;
        this.pixelWidth = this.parentElem.clientWidth;
    }

    public redrawBorders() {
        const lineGroup = this.borderGroup.selectAll('.lineData').data(this.borders);

        lineGroup.enter()
            .append('path')
            .attr('d', this.lineFunction)
            .attr('class', 'lineData')
            .attr('stroke', 'black')
            .attr('stroke-width', 5)
            .attr('fill', 'none');

        lineGroup.exit().remove();
    }

    public redrawGrid() {
        const currentGroup = this.gridGroup.selectAll('.gridbox').data(this.boxes);
        currentGroup
            .enter()
            .append('rect')
            .attr('class', 'gridbox')
            .attr('x', d => d.actualX)
            .attr('y', d => d.actualY)
            .attr('width', this.gridSize)
            .attr('height', this.gridSize)
            .attr('stroke', 'white')
            .attr('stroke-width', '1px')
            .attr('fill', d => d.getColor());

        currentGroup
            .transition()
            .attr('fill', d => d.getColor())
            .delay(d => d.drawDelay);

        currentGroup.exit().remove();
    }

    public getAttachedBoxes(box: GridBox) {
        const attachedCoordinates = box.getAttachedBoxes();
        const attachedBoxes: DirectionGridBox[] = [];

        for (let i = 0; i < 4; i++) {
            const coordinate = attachedCoordinates[i];
            let dir = 'north';
            if (i === 1) {
                dir = 'east';
            } else if (i === 2) {
                dir = 'south';
            } else if (i === 3) {
                dir = 'west';
            }
            attachedBoxes.push({
                direction: dir,
                box: this.getBox(coordinate[0], coordinate[1])
            });
        }

        return attachedBoxes;
    }

    public getBox(x: number, y: number): GridBox {
        return this.boxes.find(b => b.x === x && b.y === y);
    }
}
