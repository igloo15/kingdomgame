import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './modules/angular-material.module';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';
import { GameJsonDialogComponent } from './components/game-json-dialog/game-json-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ControlPanelComponent,
    GameJsonDialogComponent,
    GameDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    LoggerModule.forRoot({level: NgxLoggerLevel.DEBUG})
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [GameJsonDialogComponent]
})
export class AppModule { }
