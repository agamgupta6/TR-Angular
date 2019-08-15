import { BlackPageModule } from './../black-page/black-page.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material';
import { GridRoutingModule } from './grid-routing.module';
import { GridComponent } from './grid.component';
import { BlankPageComponent } from '../blank-page/blank-page.component';

@NgModule({
    imports: [
        CommonModule,
        GridRoutingModule,
        MatCardModule,
        FlexLayoutModule.withConfig({addFlexToParent: false}),
        BlackPageModule
    ],
    declarations: [GridComponent]
})
export class GridModule {}
