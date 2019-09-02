import { NgModule } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
    imports: [
        MatTabsModule,
        MatInputModule,
        MatDialogModule,
        MatButtonModule
    ],
    exports: [
        MatTabsModule,
        MatInputModule,
        MatDialogModule,
        MatButtonModule
    ]
})
export class MaterialModule {}
