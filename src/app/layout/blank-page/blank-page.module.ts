import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { BlankPageRoutingModule } from './blank-page-routing.module';
import { BlankPageComponent } from './blank-page.component';
import { MatFormFieldModule, MatIconModule, MatInputModule, MatProgressBarModule, MatGridListModule, MatCardModule, MatDividerModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, BlankPageRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatProgressBarModule,
    MatGridListModule,
    MatCardModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}),
    MatDividerModule
],
  declarations: [BlankPageComponent],
  exports: [BlankPageComponent]
})
export class BlankPageModule {}
