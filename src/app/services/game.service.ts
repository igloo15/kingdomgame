import { Injectable } from '@angular/core';
import { GameStorageService } from './game-storage.service';
import { GameFile } from '../models/gameSave';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public saveFile: GameFile;

  constructor(private gameStorage: GameStorageService, private logger: NGXLogger) {
    this.saveFile = gameStorage.getFile();
    this.logger.debug(this.saveFile);
  }

  save() {
    this.gameStorage.save(this.saveFile);
  }

  restart() {
    this.gameStorage.clear();
    this.saveFile = new GameFile();
    this.gameStorage.save(this.saveFile);
  }
}
