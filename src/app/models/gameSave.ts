import { Guid } from 'guid-typescript';

export class GameFile {
    public id: Guid;
    public name = '';
    public lastSave = new Date();

    constructor() {
        this.id = Guid.create();
    }
}
