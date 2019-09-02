import * as d3 from 'd3';
import { GridBox } from './grid-box';

export class Map {

    public parentElem: HTMLElement;
    public svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
    public gridGroup: d3.Selection<d3.BaseType, GridBox, SVGGElement, unknown>;
    public pixelWidth;
    public pixelHeight;
    public gridSize = 10;
    public gridHalfSize = 5;
    public margin = 10;

    public boxes: GridBox[] = [];

    constructor(parent: HTMLElement, gridSize: number) {
        this.parentElem = parent;
        if (gridSize) {
            this.gridSize = gridSize;
            this.gridHalfSize = this.gridSize / 2;
        }
    }

    public initialize() {
        this.updateDimensions();
        const numberOfRows = Math.floor((this.pixelHeight - this.margin) / this.gridSize);
        const numberOfColumns = Math.floor((this.pixelWidth - this.margin) / this.gridSize);
        const allRowSize = numberOfRows * this.gridSize;
        const allColumnSize = numberOfColumns * this.gridSize;
        const topMargin = (this.pixelHeight - allRowSize) / 2;
        const leftMargin = (this.pixelWidth - allColumnSize) / 2;

        for (let x = 0; x < numberOfColumns; x++) {
            for (let y = 0; y < numberOfRows; y++) {
                this.boxes.push(new GridBox(x, y, this.gridSize));
            }
        }


        this.svg = d3.select(this.parentElem).append('svg')
            .attr('width', this.pixelWidth)
            .attr('height', this.pixelHeight);

        this.gridGroup = this.svg
            .append('g')
            .attr('transform', 'translate(' + leftMargin + ',' + topMargin + ')')
            .selectAll('.gridbox')
            .data(this.boxes);

        this.gridGroup
            .enter()
            .append('rect')
            .attr('class', '.gridbox')
            .attr('x', d => d.actualX - this.gridHalfSize)
            .attr('y', d => d.actualY - this.gridHalfSize)
            .attr('width', this.gridSize)
            .attr('height', this.gridSize)
            .attr('fill', 'teal')
            .attr('stroke', 'white')
            .attr('stroke-width', '1px');
    }

    public redraw() {
        const currentGroup = this.gridGroup.data(this.boxes);
        currentGroup
            .enter()
            .append('rect')
            .attr('class', '.gridbox')
            .attr('x', d => d.x - this.gridHalfSize)
            .attr('y', d => d.y - this.gridHalfSize)
            .attr('width', this.gridSize)
            .attr('height', this.gridSize)
            .attr('fill', 'teal')
            .attr('stroke', 'white')
            .attr('stroke-width', '1px');

        currentGroup.exit().remove();
    }

    public updateDimensions() {
        this.pixelHeight = this.parentElem.clientHeight;
        this.pixelWidth = this.parentElem.clientWidth;
    }
}
