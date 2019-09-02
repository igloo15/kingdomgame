import { Component, OnInit, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { Map } from '../../models/map';
import { NGXLogger } from 'ngx-logger';
import { GameService } from 'src/app/services/game.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'kingdom-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {

  private mySubscription: Subscription;
  private initialized = false;
  public map: Map;

  constructor(private element: ElementRef, private logger: NGXLogger, private gameService: GameService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initialized = true;
    this.mySubscription = this.gameService.map.subscribe(m => {
      this.clear();
      this.map = m;
      this.initializeMap();
    });
  }

  ngOnDestroy() {
    this.mySubscription.unsubscribe();
  }

  clear() {
    const playAreaElem = this.element.nativeElement.querySelector('.play-area');
    if (playAreaElem) {
      playAreaElem.innerHTML = '';
    }
  }

  initializeMap() {
    if (this.initialized && this.map) {
      this.map.initialize(this.element.nativeElement.querySelector('.play-area'));
      this.logger.debug(`Map is ${this.map.boxes.length} boxes big`);
    } else {
      if (this.map) {
        this.logger.warn('Map Component view is not initialized yet');
      } else {
        this.logger.warn('Map not found');
      }
    }
  }

}
