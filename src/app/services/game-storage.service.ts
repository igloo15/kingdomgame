import { Injectable } from '@angular/core';
import { GameFile } from '../models/gameSave';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class GameStorageService {

  private file: GameFile;
  public readonly gameFileKey = 'gameFile';


  constructor(private logger: NGXLogger) {
    this.initialize();
  }

  public getFile(): GameFile {
    if (this.file) {
      return this.file;
    }
    this.initialize();

    return this.file;
  }

  public initialize() {
    if (localStorage) {
      if (localStorage.length > 0) {
        this.load();
      }
    } else {
      this.logger.error('no local storage, cannot save!');
    }
    if (!this.file) {
      this.file = new GameFile();
      this.save(this.file);
    }
  }

  save(gameFile: GameFile) {
    localStorage.setItem(this.gameFileKey, JSON.stringify(gameFile));
    this.logger.debug('game saved');
  }

  load() {
    const data = localStorage.getItem(this.gameFileKey);
    if (data) {
      this.file = JSON.parse(data);
      this.logger.debug('game loaded');
      return;
    }
  }

  clear() {
    localStorage.removeItem(this.gameFileKey);
  }
}
