import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { Map } from '../../models/map';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'kingdom-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {

  public map: Map;

  constructor(private element: ElementRef, private logger: NGXLogger) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.map = new Map(this.element.nativeElement.querySelector('.play-area'), 90);
    this.map.initialize();
    this.logger.debug(`Map is ${this.map.boxes.length} boxes big`);
  }

}
