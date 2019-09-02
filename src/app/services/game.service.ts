import { Injectable } from '@angular/core';
import { GameStorageService } from './game-storage.service';
import { GameFile } from '../models/gameSave';
import { NGXLogger } from 'ngx-logger';
import { Map } from '../models/map';
import { Constants } from '../models/constants';
import { Subject, BehaviorSubject } from 'rxjs';
import { MapGenerator } from '../models/map-generator';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private internalMap = new Map(Constants.mapGridSize);
  public saveFile: GameFile;
  public map: Subject<Map> = new BehaviorSubject<Map>(this.internalMap);

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

  clearMap() {
    this.internalMap.clear();
    this.internalMap.redraw();
  }

  generateWater() {
    MapGenerator.generateAllWater(this.internalMap);
    this.internalMap.redraw();
  }

  generateBorders() {
    this.internalMap.borders = MapGenerator.generateBorders(this.internalMap);

    this.internalMap.redraw();
  }

  generateArea() {
    MapGenerator.generateArea(this.internalMap);
    this.generateBorders();
  }

  newMap() {
    this.map.next(new Map(Constants.mapGridSize));
  }
}
