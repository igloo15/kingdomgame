import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameDetailsComponent } from '../game-details/game-details.component';
import { GameFile } from 'src/app/models/gameSave';

@Component({
    selector: 'kingdom-game-json-dialog',
    templateUrl: 'game-json-dialog.component.html'
})

export class GameJsonDialogComponent {
    constructor(public dialogRef: MatDialogRef<GameJsonDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: GameFile) { }

    onDone() {
        this.dialogRef.close();
    }
}
