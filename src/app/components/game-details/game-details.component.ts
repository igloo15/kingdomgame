import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { MatDialog } from '@angular/material/dialog';
import { GameJsonDialogComponent } from '../game-json-dialog/game-json-dialog.component';
import { version, date } from '../../../../package.json';

@Component({
  selector: 'kingdom-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {

  public version = version;
  public date = date;

  constructor(public gameService: GameService, private dialog: MatDialog) { }

  ngOnInit() {
  }

  onSave() {
    this.gameService.save();
  }

  onShowFile() {
    const dialogRef = this.dialog.open(GameJsonDialogComponent, {
      width: '500px',
      data: this.gameService.saveFile
    });
  }

  onRestart() {
    this.gameService.restart();
  }

  onClear() {
    this.gameService.clearMap();
  }

  onGenerateWater() {
    this.gameService.generateWater();
  }

  onGenerateBorders() {
    this.gameService.generateBorders();
  }

  onGenerateArea() {
    this.gameService.generateArea();
  }

  onRegenerate() {
    this.gameService.newMap();
  }

}
